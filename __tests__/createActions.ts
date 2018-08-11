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

  interface FollowerST {
    now: string
  }
  const FollowerModel: Modeler<FollowerST> = injects => ({
    now: '',
    ...injects
  })
  const mutations = {}
  const subscriptions = {
    tick (state: FollowerST, timeLabel: string) {
      return { ...state, now: timeLabel }
    }
  }

  // @ Aggregates

  const namespace = 'timer/'
  const Timer = createActions(TimerAC, namespace)
  const Follower1 = createAggregate(mutations, 'follower1/')
  const Follower2 = createAggregate(mutations, 'follower2/')
  Follower1.subscribe(Timer, subscriptions)
  Follower2.subscribe(Timer, subscriptions)

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
      follower1: FollowerST
      follower2: FollowerST
    }
    const store: Store<StoreST> = createStore(
      combineReducers({
        follower1: Follower1.reducerFactory(FollowerModel()),
        follower2: Follower2.reducerFactory(FollowerModel())
      })
    )

    test('subscribers update by providers action', () => {
      const { type, payload } = Timer.creators.tick()
      const beforeState = store.getState()
      expect(beforeState.follower1.now).not.toEqual(payload)
      expect(beforeState.follower2.now).not.toEqual(payload)

      store.dispatch({ type, payload })

      const afterState = store.getState()
      expect(afterState.follower1.now).toEqual(payload)
      expect(afterState.follower2.now).toEqual(payload)
    })
  })

  describe('raise error', () => {
    test('conflict namespace', () => {
      const conflictHandler = () => createActions(TimerAC, namespace)
      expect(conflictHandler).toThrow()
    })
  })
})
