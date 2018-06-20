import { Reducer } from 'redux'

type Types<M> = {[S in keyof M]: string}
type SecondArgs<T> = T extends (a1: any, a2: infer A2, ...rest: any[]) => any ? A2 : never
type Payload<T> = T extends SecondArgs<T> ? never : SecondArgs<T>
type Creator<T> = T extends SecondArgs<T> ? () => any : (payload: Payload<T>) => any
export type Creators<M> = {[S in keyof M]: Creator<M[S]>}

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
  const mutators = {}
  Object.keys(mutations).forEach(mutationKey => {
    const type = `${namespace}${mutationKey}`
    types[mutationKey] = type
    creators[mutationKey] = payload => ({ type, payload })
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
    types: (types as Types<M>),
    creators: (creators as Creators<M>),
    reducerFactory
  }
}
