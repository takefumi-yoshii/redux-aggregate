import { KeyMap, A1, A2 } from './utils'
import {
  ActionType,
  ActionTypes,
  ReducerFactory,
  ActionProvider,
  Subscriptions
} from './commons'
import { Actions, ActionsSrc } from './createActions'

// ______________________________________________________

type MT<T> = (state: A1<T>) => A1<T>
type MTPL<T> = (state: A1<T>, payload: A2<T>) => A1<T>
type Mutation<T> = MT<T> | MTPL<T>
type Mutations<T> = { readonly [K in keyof T]: Mutation<T[K]> }

type CR<T> = () => { type: ActionType }
type CRPL<T> = (payload: A2<T>) => { type: ActionType; payload: A2<T> }
type ActionCreator<T> = T extends MT<T> ? CR<T> : CRPL<T>
type ActionCreators<T> = { readonly [K in keyof T]: ActionCreator<T[K]> }

// ______________________________________________________

interface Aggregate<T> {
  readonly __namespace__: string
  readonly __srcmap__: T
  readonly types: ActionTypes<T>
  readonly creators: ActionCreators<T>
  readonly reducerFactory: ReducerFactory
  subscribe: <T extends ActionProvider<T>, M extends Subscriptions<T, M>>(
    provider: T,
    subscriptions: M
  ) => void
}

// ______________________________________________________

declare function createAggregate<T extends KeyMap & Mutations<T>>(
  mutations: T,
  namespace: string
): Aggregate<T>

export { Mutations, ActionCreators, Aggregate, createAggregate }
