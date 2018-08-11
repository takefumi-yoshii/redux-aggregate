import { Reducer } from 'redux'
import { KeyMap, R, A1, A2, DiffKey, HasKeysDiff } from './utils'
import { ActionType, ActionTypes } from './commons'
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

type HasKeysDiffErrorMessage = 'SUBSCRIBE_MAP_NOT_MATCH_KEYS'
type PayloadErrorMessage = 'PAYLOAD_SCHEMA_NOT_MATCH'
type ReducerFactory = <S>(state: S) => Reducer<S>
type SubscribeActions<T, M> = R<T> extends A2<M> ? M : PayloadErrorMessage
type SubscribeAggregate<T, M> = A2<M> extends A2<T> ? M : PayloadErrorMessage
type SubscribeActionsMap<T, M> = HasKeysDiff<T, M> extends false
  ? { [K in keyof T & keyof M]?: SubscribeActions<T[K], M[K]> } & KeyMap
  : HasKeysDiffErrorMessage
type SubscribeAggregateMap<T, M> = HasKeysDiff<T, M> extends false
  ? { [K in keyof T & keyof M]?: SubscribeAggregate<T[K], M[K]> } & KeyMap
  : HasKeysDiffErrorMessage

// ______________________________________________________

type ISM = { __srcmap__: any }
type SrcMap<T extends ISM> = T['__srcmap__']
type SubscribeProvider<T extends ISM> =
  | Aggregate<SrcMap<T>>
  | Actions<SrcMap<T>>
type SubscribeMap<T extends ISM, M> = T extends Aggregate<SrcMap<T>>
  ? SubscribeAggregateMap<SrcMap<T>, M>
  : SubscribeActionsMap<SrcMap<T>, M>
interface Aggregate<T> {
  readonly __namespace__: string
  readonly __srcmap__: T
  readonly types: ActionTypes<T>
  readonly creators: ActionCreators<T>
  readonly reducerFactory: ReducerFactory
  subscribe: <T extends SubscribeProvider<T>, M extends SubscribeMap<T, M>>(
    provider: T,
    subscribeMap: M
  ) => void
}

// ______________________________________________________

declare function createAggregate<T extends KeyMap & Mutations<T>>(
  mutations: T,
  namespace: string
): Aggregate<T>

type Modeler<T> = (injects?: Partial<T>) => T

export {
  Mutations,
  ActionCreators,
  ReducerFactory,
  Aggregate,
  SubscribeProvider,
  SubscribeMap,
  createAggregate,
  Modeler
}
