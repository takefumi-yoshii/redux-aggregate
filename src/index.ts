import { Reducer } from 'redux'

type A2<T> = T extends (a1: any, a2: infer I, ...rest: any[]) => any ? I : never
type Types<M> = {readonly [S in keyof M]: string}
type Payload<T> = T extends A2<T> ? never : A2<T>
type CreatorReturn<T> = T extends A2<T> ? { type: string } : { type: string, payload: A2<T> }
type Creator<T> = T extends A2<T> ? () => CreatorReturn<T> : (payload: Payload<T>) => CreatorReturn<T>
type Creators<M> = {readonly [S in keyof M]: Creator<M[S]>}
interface Aggregate<M> {
  readonly types: Types<M>
  readonly creators: Creators<M>
  readonly reducerFactory: <S>(state: S) => Reducer<S>
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
