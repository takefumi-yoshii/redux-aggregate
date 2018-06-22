import { Reducer } from 'redux'

type A1<T>          = T extends (a1: infer I, ...rest: any[]) => any ? I : never
type A2<T>          = T extends (a1: any, a2: infer I, ...rest: any[]) => any ? I : never
type Payload<T>     = T extends A2<T> ? never : A2<T>
type CreatorR<T>    = T extends A2<T> ? { type: string } : { type: string, payload: A2<T> }
type Creator<T>     = T extends A2<T> ? () => CreatorR<T> : (payload: Payload<T>) => CreatorR<T>
type Mutation<T>    = T extends A2<T> ? (state: A1<T>) => A1<T> : (state: A1<T>, payload: A2<T>) => A1<T>
type Types<T>       = { readonly [K in keyof T]: string }
type Creators<T>    = { readonly [K in keyof T]: Creator<T[K]> }
type Mutations<T>   = { readonly [K in keyof T]: Mutation<T[K]> }
type ReducerFactory = <S>(state: S) => Reducer<S>
type KeyMap         = { [K: string]: any }
export interface Aggregate<M> {
  readonly types: Types<M>
  readonly creators: Creators<M>
  readonly reducerFactory: ReducerFactory
}
type Injects<T> = { [P in keyof T]?: T[P] }
export type Modeler<T> = (injects?: Injects<T>) => T

const namespaced: KeyMap = {}

export function createAggregate<M extends KeyMap & Mutations<M>>(mutations: M, namespace: string): Aggregate<M> {
  if (namespaced[namespace] !== undefined) {
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
    types: (types as Types<M>),
    creators: (creators as Creators<M>),
    reducerFactory: (reducerFactory as ReducerFactory)
  }
}
