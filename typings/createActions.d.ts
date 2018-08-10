import { KeyMap, R, A1, A2 } from './utils'
import { ActionType, ActionTypes } from './commons'

// ______________________________________________________

type ACS<T> = () => void
type ACSPL<T> = (payload: A1<T>) => R<T>
type ActionSrc<T> = ACS<T> | ACSPL<T>
type ActionsSrc<T> = { readonly [K in keyof T]: ActionSrc<T[K]> }

type CR<T> = () => { type: ActionType }
type CRPL<T> = (payload: A1<T>) => { type: ActionType; payload: R<T> }
type ActionCreator<T> = T extends ACS<T> ? CR<T> : CRPL<T>
type ActionCreators<T> = { readonly [K in keyof T]: ActionCreator<T[K]> }

// ______________________________________________________

interface Actions<T> {
  __namespace__: string
  __srcmap__: T
  readonly types: ActionTypes<T>
  readonly creators: ActionCreators<T>
}

// ______________________________________________________

declare function createActions<T extends KeyMap & ActionsSrc<T>>(
  actionsSrc: T,
  namespace: string
): Actions<T>

export { ActionsSrc, ActionCreators, Actions, createActions }
