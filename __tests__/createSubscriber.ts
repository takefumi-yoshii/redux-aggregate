import { createStore, combineReducers, Store } from 'redux'
import { createSubscriber, createActions, Modeler } from '../src/index'

describe('createSubscriber', () => {
  // @ Actions

  function tick() {
    const date = new Date()
    const month = date.getMonth() + 1
    const _date = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return `${month}/${_date} ${hour}:${minute}:${second}`
  }
  const TimerAC = { tick }

  // @ Model

  interface SubscriberST {
    now: string
    name: string
  }
  const SubscriberModel: Modeler<SubscriberST> = injects => ({
    now: '',
    name: 'unknown',
    ...injects
  })
  const subscriptions = {
    tick(state: SubscriberST, now: string) {
      return { ...state, now }
    },
    setName(state: SubscriberST, name: string) {
      return { ...state, name }
    }
  }

  // @ Aggregates

  const namespace = 'timer/'
  const Timer = createActions(TimerAC, namespace)
  const Subscriber1 = createSubscriber()
  const Subscriber2 = createSubscriber()
  Subscriber1.subscribe(Timer, subscriptions)
  Subscriber2.subscribe(Timer, subscriptions)

  // ______________________________________________________

  describe('reducerFactory', () => {
    interface StoreST {
      subscriber1: SubscriberST
      subscriber2: SubscriberST
    }
    const store: Store<StoreST> = createStore(
      combineReducers({
        subscriber1: Subscriber1.reducerFactory(SubscriberModel({ name: 'USER_1' })),
        subscriber2: Subscriber2.reducerFactory(SubscriberModel({ name: 'USER_2' }))
      })
    )

    test('subscribers update by providers action', () => {
      const { type, payload } = Timer.creators.tick()
      const beforeState = store.getState()
      expect(beforeState.subscriber1.now).not.toEqual(payload)
      expect(beforeState.subscriber2.now).not.toEqual(payload)

      store.dispatch({ type, payload })

      const afterState = store.getState()
      expect(afterState.subscriber1.now).toEqual(payload)
      expect(afterState.subscriber2.now).toEqual(payload)
    })
  })
})
