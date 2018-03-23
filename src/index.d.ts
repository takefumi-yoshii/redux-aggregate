import immer from 'immer'
import { Reducer, AnyAction } from 'redux'

export interface state {
  [s: string]: any
}
export interface computed {
  [s: string]: (p?: any) => any
}
export interface actions {
  [s: string]: (p?: any) => void
}
export interface Model extends state, computed {}
export type Modeler<I> = <I>(i: I) => Model & I
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
  state?: state
  computed?: ThisType<Model> & computed
  actions?: ThisType<Model> & actions
}
export interface Aggregate {
  types: types
  creators: creators
  reducer: <I>(modeler: Modeler<I>) => Reducer<Model & I>
  modeler: <I>(i: object) => Modeler<I>
}

export function createAggregate<C, D>(ctx: C, domain: D): Aggregate 

export function reduceAggregate<A, I>(aggregate: A, injects?: I): Reducer<Modeler<I>> 
