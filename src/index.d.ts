import { Reducer } from 'redux'

// ______________________________________________________

interface state {
  [s: string]: any
}
interface computed {
  [s: string]: (p?: any) => any
}
interface actions {
  [s: string]: <P>(payload?: P) => ({ type: string, payload: P })
}
interface Model extends state, computed {}

// ______________________________________________________

type Modeler<I> = <I>(i: I) => Model & I

type types<T> = {
  [P in keyof T]: string
}
type creators<T> = {
  [P in keyof T]?: T[P]
}
type Domain = {
  state?: state
  computed?: ThisType<Model> & computed
  actions?: ThisType<Model> & actions
}
type Aggregate<D extends Domain> = {
  types: types<D['actions']>
  creators: creators<D['actions']>
  reducer: <I>(modeler: Modeler<I>) => Reducer<Model>
  modeler: <I>(injects: I) => Modeler<I>
}

// ______________________________________________________

declare function createActions<C, F>(ctx: C, __fnnames__: F): { types: types<F>, creators: creators<F> }
declare function createReducer<A>(__actions__: A)

// ______________________________________________________

export function createAggregate<C, D>(ctx: C, domain: D): Aggregate<D>
export function reduceAggregate<A, I>(aggregate: A, injects?: I): Reducer<Modeler<I>> 
