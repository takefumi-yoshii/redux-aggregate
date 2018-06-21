import { Reducer } from 'redux'

type A1<T> = T extends (a1: infer I, ...rest: any[]) => any ? I : never
type A2<T> = T extends (a1: any, a2: infer I, ...rest: any[]) => any ? I : never
type Types<T> = KeyRefMap & {readonly [K in keyof T]: string}
type Payload<T> = T extends A2<T> ? never : A2<T>
type CreatorReturn<T> = T extends A2<T> ? { type: string } : { type: string, payload: A2<T> }
type Creator<T> = T extends A2<T> ? () => CreatorReturn<T> : (payload: Payload<T>) => CreatorReturn<T>
type Creators<T> = KeyRefMap & {readonly [K in keyof T]: Creator<T[K]>}
type Mutation<T> = T extends A2<T> ? (state: A1<T>) => A1<T> : (state: A1<T>, payload: A2<T>) => A1<T>
type Mutations<T> = KeyRefMap & {readonly [K in keyof T]: Mutation<T[K]>}
interface KeyRefMap { [K: string]: any }
interface Aggregate<M> {
  readonly types: Types<M>
  readonly creators: Creators<M>
  readonly reducerFactory: <S>(state: S) => Reducer<S>
}

const namespaced: KeyRefMap = {}

export function createAggregate<M extends Mutations<M>>(mutations: M, namespace: string): Aggregate<M> {
  if (namespaced[namespace] !== undefined) {
    throw new Error(`redux-aggregate: conflict namespace -> ${namespace}`)
  } else {
    namespaced[namespace] = namespace
  }
  const types: KeyRefMap = {}
  const creators: KeyRefMap = {}
  const mutators: KeyRefMap = {}
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
    types: (types as Types<M>),
    creators: (creators as Creators<M>),
    reducerFactory
  }
}
