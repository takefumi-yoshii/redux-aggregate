import { createStore, combineReducers, Store } from 'redux'
import { createAggregate, Modeler } from '../src/index'

describe('createAggregate', () => {
  interface CounterST {
    name: string
    count: number
  }
  const CounterModel: Modeler<CounterST> = injects => ({
    name: 'MyName',
    count: 0,
    ...injects
  })
  function increment(state: CounterST): CounterST {
    return { ...state, count: state.count + 1 }
  }
  function setCount(state: CounterST, value: number): CounterST {
    return { ...state, count: value }
  }
  const NameSpace = 'counter/'
  const Mutations = { increment, setCount }
  const Counter = createAggregate(Mutations, NameSpace)

  describe('generated modules behavior', () => {
    test('types has namespaced value', () => {
      const { types } = Counter
      expect(types.increment).toEqual(`${NameSpace}increment`)
    })
    test('creators has function', () => {
      const { creators } = Counter
      expect(typeof creators.increment === 'function').toBe(true)
    })
    test('reducerFactory is function', () => {
      const { reducerFactory } = Counter
      expect(typeof reducerFactory === 'function').toBe(true)
    })
  })

  describe('action creators', () => {
    const action = Counter.creators.increment()
    const type = Counter.types.increment
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
      counter: CounterST
    }
    const store: Store<StoreST> = createStore(
      combineReducers({
        counter: Counter.reducerFactory(CounterModel())
      })
    )
    test('store has counter', () => {
      const state = store.getState()
      expect(state.counter.count).toEqual(0)
    })
    test('reducer update state', () => {
      store.dispatch(Counter.creators.increment())
      const state = store.getState()
      expect(state.counter.count).toEqual(1)
    })
  })

  describe('raise error', () => {
    test('conflict namespace', () => {
      const conflictHandler = () => createAggregate(Mutations, NameSpace)
      expect(conflictHandler).toThrow()
    })
  })
})
