import immer from 'immer'
import { Reducer, AnyAction } from 'redux'
// ______________________________________________________

export interface state {
  [s: string]: any
}
export interface computed {
  [s: string]: Function
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
  state: any
  computed?: any
  actions?: any
}
export interface Aggregate {
  types: types
  creators: creators
  reducer: <I>(modeler: Modeler<I>) => Reducer<Model<I>>
  modeler: <I>(i: object) => Modeler<I>
}

// ______________________________________________________

function createActions(ctx: string, __fnnames__: string[]) {
  const types: types = {}
  const creators: creators = {}
  __fnnames__.map(row => {
    const type = `${ctx}${row}`
    types[row] = type
    creators[row] = payload => ({ type, payload })
  })
  return { types, creators }
}

function createReducer(__actions__: actions) {
  return function <I>(initialModel: Modeler<I>): Reducer<Modeler<I>> {
    return (model = initialModel, action: AnyAction): Modeler<I> => {
      if (typeof __actions__[action.type] !== 'function') return model
      const payload = action.payload || {}
      return immer(model, draft => {
        __actions__[action.type].bind(draft)(payload)
      })
    }
  }
}

// ______________________________________________________

export function createAggregate(ctx: string, domain: Domain): Aggregate {
  const { state, computed, actions } = domain
  const __actions__: actions = {}
  const __fnnames__: string[] = []
  Object.keys(actions).forEach(key => {
    __actions__[`${ctx}${key}`] = actions[key]
    __fnnames__.push(key)
  })
  const { types, creators } = createActions(ctx, __fnnames__)
  const reducer = createReducer(__actions__)
  const modeler = <I>(injects): Modeler<I> => (<any>Object).assign({}, state, injects, computed)
  return { types, creators, reducer, modeler }
}

export function reduceAggregate<D, I>(aggregate: Aggregate, injects?: object): Reducer<Model<I>> {
  const { reducer, modeler } = aggregate
  return reducer(modeler(injects))
}
