import { Reducer } from 'redux'

export type Types<M> = {
  [S in keyof M]: string
}
export type Creators<M> = {
  [S in keyof M]: <P>(payload?: P) => any
}
export interface Aggregate<M> {
  types: Types<M>
  creators: Creators<M>
  reducerFactory: <S>(state: S) => Reducer<S>
}

const namespaced = {}

export function createAggregate<M>(mutations: M, namespace: string): Aggregate<M> {
  if (namespaced[namespace] !== undefined) {
    throw new Error(`redux-aggregate: conflict namespace -> ${namespace}`)
  } else {
    namespaced[namespace] = namespace
  }
  const types = {}
  const creators = {}
  const functions = {}
  Object.keys(mutations).forEach(row => {
    const type = `${namespace}${row}`
    types[row] = type
    creators[row] = payload => ({ type, payload })
    functions[type] = mutations[row]
  })
  function reducerFactory<S>(initialState: S): Reducer<S> {
    return (state = initialState, action) => {
      const fn = functions[action.type]
      if (typeof fn !== 'function') return state
      const payload = action.payload || {}
      return fn(state, payload)
    }
  }
  return {
    types: (types as Types<M>),
    creators: (creators as Creators<M>),
    reducerFactory
  }
}
