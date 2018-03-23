import immer from 'immer'
import { Reducer, AnyAction } from 'redux'

// ______________________________________________________

export interface state {
  [s: string]: any
}
export interface computed {
  [s: string]: (p?: any) => any
}
export interface actions {
  [s: string]: (p?: any) => void
}
export interface Model<I> extends state, computed {}
export type Modeler<I> = <I>(i: object) => Model<I>
export interface types {
  [s: string]: string
}
export interface creators {
  [s: string]: <P>(p?: P) => void
}
export interface createActions {
  types: types
  creators: creators
}
export interface Domain {
  state?: state
  computed?: computed
  actions?: actions
}
export interface Aggregate {
  types: types
  creators: creators
  reducer: <I>(modeler: Modeler<I>) => Reducer<Model<I>>
  modeler: <I>(i: object) => Modeler<I>
}

// ______________________________________________________

function createActions(ctx: string, __fnns__: string[]) {
  const types: types = {}
  const creators: creators = {}
  __fnns__.map(row => {
    const type = `${ctx}${row}`
    types[row] = type
    creators[row] = payload => ({ type, payload })
  })
  return { types, creators }
}

function createReducer(__acts__: actions) {
  return function <I>(initialModel: Modeler<I>): Reducer<Modeler<I>> {
    return (model = initialModel, action: AnyAction): Modeler<I> => {
      const { type, payload } = action
      if (typeof __acts__[type] !== 'function') return model
      return immer(model, draft => {
        __acts__[action.type].bind(draft)(payload)
      })
    }
  }
}

// ______________________________________________________

export function createAggregate(ctx: string, domain: Domain): Aggregate {
  const { state, computed, actions } = domain
  const __acts__: actions = {}
  const __fnns__: string[] = []
  Object.keys(actions).forEach(key => {
    __acts__[`${ctx}${key}`] = actions[key]
    __fnns__.push(key)
  })
  const { types, creators } = createActions(ctx, __fnns__)
  const reducer = createReducer(__acts__)
  const modeler = <I>(injects): Modeler<I> => (<any>Object).assign({}, state, injects, computed)
  return { types, creators, reducer, modeler }
}

export function reduceAggregate<D, I>(aggregate: Aggregate, injects?: object): Reducer<Model<I>> {
  const { reducer, modeler } = aggregate
  return reducer(modeler(injects))
}
