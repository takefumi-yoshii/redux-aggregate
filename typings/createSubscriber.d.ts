import { ReducerFactory, ActionProvider, Subscriptions } from './commons'

// ______________________________________________________

interface Subscriber {
  readonly reducerFactory: ReducerFactory
  subscribe: <T extends ActionProvider<T>, M extends Subscriptions<T, M>>(
    provider: T,
    subscriptions: M
  ) => void
}

// ______________________________________________________

declare function createSubscriber(): Subscriber

export { Subscriber, createSubscriber }
