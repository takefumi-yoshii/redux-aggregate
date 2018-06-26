import { Reducer } from 'redux'

type A1<T>          = T extends (a1: infer I, ...rest: any[]) => any ? I : never
type A2<T>          = T extends (a1: any, a2: infer I, ...rest: any[]) => any ? I : never
type Payload<T>     = T extends A2<T> ? never : A2<T>
type CreatorR<T>    = T extends A2<T> ? { type: string } : { type: string, payload: A2<T> }
type Creator<T>     = T extends A2<T> ? () => CreatorR<T> : (payload: Payload<T>) => CreatorR<T>
type Mutation<T>    = T extends A2<T> ? (state: A1<T>) => A1<T> : (state: A1<T>, payload: A2<T>) => A1<T>
type IMutation<T>   = T extends A2<T> ? (state: A1<T>) => void: (state: A1<T>, payload: A2<T>) => void
type KeyMap         = { [K: string]: any }
type Types<T>       = { readonly [K in keyof T]: string }
type Creators<T>    = { readonly [K in keyof T]: Creator<T[K]> }
type Mutations<T>   = { readonly [K in keyof T]: Mutation<T[K]> }
type IMutations<T>  = { readonly [K in keyof T]: IMutation<T[K]> }
type ReducerFactory = <S>(state: S) => Reducer<S>
type Reducer<T> = Reducer<T>
interface Aggregate<M> {
  readonly types: Types<M>
  readonly creators: Creators<M>
  readonly reducerFactory: ReducerFactory
}
type Injects<T> = { [P in keyof T]?: T[P] }
type Modeler<T> = (injects?: Injects<T>) => T

declare function createAggregate<M extends KeyMap & Mutations<M>>(mutations: M, namespace: string): Aggregate<M>
