import immer from 'immer'
import { Reducer, AnyAction } from 'redux'

export interface state {
  [s: string]: any
}
export interface computed {
  [s: string]: Function
}
export interface actions {
  [s: string]: (p?: any) => void
}
export interface Model<I> extends state, computed, actions {}
export type Modeler<I> = <I>(i: object) => Model<I>
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
  state: any
  computed?: any
  actions?: any
}
export interface Aggregate {
  types: types
  creators: creators
  reducer: <I>(modeler: Modeler<I>) => Reducer<Model<I>>
  modeler: <I>(i: object) => Modeler<I>
}

export function createAggregate(namespace: string, domain: Domain): Aggregate 

export function reduceAggregate<D, I>(aggregate: Aggregate, injects?: object): Reducer<Model<I>> 
