import { Reducer } from 'redux'

type A1<T> = T extends (a1: infer I, ...rest: any[]) => any ? I : never
type A2<T> = T extends (a1: any, a2: infer I, ...rest: any[]) => any ? I : never
type MT<T> = (state: A1<T>) => A1<T>
type MTPL<T> = (state: A1<T>, payload: A2<T>) => A1<T>
type CR<T> = () => { type: string }
type CRPL<T> = (payload: A2<T>) => { type: string; payload: A2<T> }
type Mutation<T> = MT<T> | MTPL<T>
type Creator<T> = T extends MT<T> ? CR<T> : CRPL<T>
type Types<T> = { readonly [K in keyof T]: string }
type Creators<T> = { readonly [K in keyof T]: Creator<T[K]> }
type Mutations<T> = { readonly [K in keyof T]: Mutation<T[K]> }
type KeyMap = { [K: string]: any }
type ReducerFactory = <S>(state: S) => Reducer<S>
interface Aggregate<M> {
  readonly types: Types<M>
  readonly creators: Creators<M>
  readonly reducerFactory: ReducerFactory
}
declare function createAggregate<M extends KeyMap & Mutations<M>>(
  mutations: M,
  namespace: string
): Aggregate<M>

export {
  KeyMap,
  Types,
  Creators,
  Mutations,
  ReducerFactory,
  Aggregate,
  createAggregate
}
