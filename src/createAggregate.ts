import { Reducer } from 'redux'
import { namespaced } from './namespaced'
import { KeyMap } from '../typings/utils'
import {
  ActionTypes,
  ReducerFactory,
  ActionProvider,
  Subscriptions
} from '../typings/commons'
import {
  Mutations,
  ActionCreators,
  Aggregate
} from '../typings/createAggregate'

// ______________________________________________________

function createAggregate<T extends KeyMap & Mutations<T>>(
  mutations: T,
  namespace: string
): Aggregate<T> {
  if (
    namespaced[namespace] !== undefined &&
    process.env.NODE_ENV !== 'development'
  ) {
    throw new Error(`redux-aggregate: conflict namespace -> ${namespace}`)
  } else {
    namespaced[namespace] = namespace
  }
  const types: KeyMap = {}
  const creators: KeyMap = {}
  const __srcmap__: KeyMap = {}
  Object.keys(mutations).forEach(key => {
    const type = `${namespace}${key}`
    types[key] = type
    creators[key] = (payload?: any) => ({ type, payload })
    __srcmap__[type] = mutations[key]
  })
  function reducerFactory<S>(initialState: S): Reducer<S> {
    return (state = initialState, action) => {
      const mutator = __srcmap__[action.type]
      if (typeof mutator !== 'function') return state
      return mutator(state, action.payload)
    }
  }
  function subscribe<
    T extends ActionProvider<T>,
    M extends Subscriptions<T, M>
  >(provider: T, subscriptions: M) {
    Object.keys(subscriptions).forEach(key => {
      const type = `${provider.__namespace__}${key}`
      __srcmap__[type] = (subscriptions as KeyMap)[key]
    })
  }
  return {
    __namespace__: namespace,
    __srcmap__: __srcmap__ as T,
    types: types as ActionTypes<T>,
    creators: creators as ActionCreators<T>,
    reducerFactory: reducerFactory as ReducerFactory,
    subscribe
  }
}

// ______________________________________________________

type Modeler<T> = (injects?: Partial<T>) => T

export { createAggregate, Modeler }
