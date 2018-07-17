import { Reducer } from 'redux'
import {
  KeyMap,
  Types,
  Creators,
  Mutations,
  ReducerFactory,
  Aggregate
} from '../typings'

const namespaced: KeyMap = {}

function createAggregate<M extends KeyMap & Mutations<M>>(
  mutations: M,
  namespace: string
): Aggregate<M> {
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
  const mutators: KeyMap = {}
  Object.keys(mutations).forEach(mutationKey => {
    const type = `${namespace}${mutationKey}`
    types[mutationKey] = type
    creators[mutationKey] = (payload: any) => ({ type, payload })
    mutators[type] = mutations[mutationKey]
  })
  function reducerFactory<S>(initialState: S): Reducer<S> {
    return (state = initialState, action) => {
      const mutator = mutators[action.type]
      if (typeof mutator !== 'function') return state
      return mutator(state, action.payload)
    }
  }
  return {
    types: types as Types<M>,
    creators: creators as Creators<M>,
    reducerFactory: reducerFactory as ReducerFactory
  }
}

type Injects<T> = { [P in keyof T]?: T[P] }
type Modeler<T> = (injects?: Injects<T>) => T

export { createAggregate, Modeler }
