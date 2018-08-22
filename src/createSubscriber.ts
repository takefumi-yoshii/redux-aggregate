import { Reducer } from 'redux'
import { KeyMap } from '../typings/utils'
import {
  ReducerFactory,
  ActionProvider,
  Subscriptions
} from '../typings/commons'
import { Subscriber } from '../typings/createSubscriber'

// ______________________________________________________

function createSubscriber(): Subscriber {
  const __srcmap__: KeyMap = {}
  function reducerFactory<S>(initialState: S): Reducer<S> {
    return (state = initialState, action) => {
      const mutator = __srcmap__[action.type]
      if (typeof mutator !== 'function') return state
      return mutator(state, action.payload)
    }
  }
  function subscribe<
    T extends ActionProvider<T>,
    M extends Subscriptions<T, M>
  >(provider: T, subscriptions: M) {
    Object.keys(subscriptions).forEach(key => {
      const type = `${provider.__namespace__}${key}`
      __srcmap__[type] = (subscriptions as KeyMap)[key]
    })
  }
  return {
    reducerFactory: reducerFactory as ReducerFactory,
    subscribe
  }
}

// ______________________________________________________

type Modeler<T> = (injects?: Partial<T>) => T

export { createSubscriber, Modeler }
