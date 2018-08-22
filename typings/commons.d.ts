import { Reducer } from 'redux'
import { KeyMap, R, A1, A2, DiffKey, HasKeysDiff } from './utils'
import { Aggregate } from './createAggregate'
import { Actions } from './createActions'

type ActionType = string
type ActionTypes<T> = { readonly [K in keyof T]: ActionType }
type ReducerFactory = <S>(state: S) => Reducer<S>

// ______________________________________________________

type HasKeysDiffErrorMessage = 'SUBSCRIPTIONS_KEY_NOT_MATCH'
type PayloadErrorMessage = 'PAYLOAD_SCHEMA_NOT_MATCH'
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
type ActionProvider<T extends ISM> = Aggregate<SrcMap<T>> | Actions<SrcMap<T>>
type Subscriptions<T extends ISM, M> = T extends Aggregate<SrcMap<T>>
  ? SubscribeAggregateMap<SrcMap<T>, M>
  : SubscribeActionsMap<SrcMap<T>, M>

// ______________________________________________________

export {
  ActionType,
  ActionTypes,
  ReducerFactory,
  SubscribeAggregateMap,
  SubscribeActionsMap,
  ActionProvider,
  Subscriptions
}
