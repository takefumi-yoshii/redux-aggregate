import { createStore, combineReducers, Store } from 'redux'
import { createAggregate, Modeler, createActions } from '../src/index'

describe('createActions', () => {
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
  const mutations = {
    setName(state: SubscriberST, name: string) {
      return { ...state, name }
    }
  }
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
  const Subscriber1 = createAggregate(mutations, 'subscriber1/')
  const Subscriber2 = createAggregate(mutations, 'subscriber2/')
  Subscriber1.subscribe(Timer, subscriptions)
  Subscriber2.subscribe(Timer, subscriptions)
  Subscriber2.subscribe(Subscriber1, subscriptions)

  // ______________________________________________________

  describe('generated modules behavior', () => {
    test('types has namespaced value', () => {
      const action = Timer.creators.tick()
      const { type } = action
      expect(type).toEqual(`${namespace}tick`)
    })
    test('creators has function', () => {
      const { creators } = Timer
      expect(typeof creators.tick === 'function').toBe(true)
    })
  })

  describe('action creators', () => {
    const action = Timer.creators.tick()
    const type = Timer.types.tick
    test('generated action creator return action', () => {
      expect(action).toHaveProperty('type')
      expect(action).toHaveProperty('payload')
    })
    test('generated action type is equal to returned action type', () => {
      expect(action.type).toEqual(type)
    })
  })

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

    test('aggregate have behavior of action provider', () => {
      const { type, payload } = Subscriber1.creators.setName('MY_NAME')
      const beforeState = store.getState()
      expect(beforeState.subscriber1.name).not.toEqual(payload)
      expect(beforeState.subscriber2.name).not.toEqual(payload)

      store.dispatch({ type, payload })

      const afterState = store.getState()
      expect(afterState.subscriber1.name).toEqual(payload)
      expect(afterState.subscriber2.name).toEqual(payload)
    })
  })

  describe('raise error', () => {
    test('conflict namespace', () => {
      const conflictHandler = () => createActions(TimerAC, namespace)
      expect(conflictHandler).toThrow()
    })
  })
})
