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
export interface Model<I> extends state, computed, actions {}
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

function createActions(constants: string[], namespace: string) {
  const types: types = {}
  const creators: creators = {}
  constants.map(row => {
    const type = `${namespace}${row}`
    types[row] = type
    creators[row] = payload => {
      return { type, payload }
    }
  })
  return { types, creators }
}

function createReducer(constants: string[], namespace: string) {
  return function <I>(initialModel: Modeler<I>): Reducer<Modeler<I>> {
    return (model = initialModel, action: AnyAction): Modeler<I> => {
      if (typeof model[action.type] === 'function') {
        const payload = action.payload || {}
        return immer(model, draft => {
          draft[action.type](payload)
        })
      }
      return model
    }
  }
}

// ______________________________________________________

export function createAggregate(namespace: string, domain: Domain): Aggregate {
  const { state, computed, actions } = domain
  const constants: string[] = []
  const renamedActions = {}
  Object.keys(actions).forEach(key => {
    renamedActions[`${namespace}${key}`] = actions[key]
    constants.push(key)
  })
  const { types, creators } = createActions(constants, namespace)
  const reducer = createReducer(constants, namespace)
  function modeler <I>(injects): Modeler<I> {
    return (<any>Object).assign({}, state, injects, computed, renamedActions)
  }
  return {
    types,
    creators,
    reducer,
    modeler
  }
}

export function reduceAggregate<D, I>(aggregate: Aggregate, injects?: object): Reducer<Model<I>> {
  const { reducer, modeler } = aggregate
  return reducer(modeler(injects))
}
