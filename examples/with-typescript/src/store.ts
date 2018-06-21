import { createStore, combineReducers, Store, ReducersMapObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { CounterMT, CounterST } from './models/counter'

// ______________________________________________________

export function defineStore<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

// ______________________________________________________

export interface StoreST {
  counter1: CounterST
  counter2: CounterST
  counter3: CounterST
}
export const Counter1 = createAggregate(CounterMT, 'counter1/')
export const Counter2 = createAggregate(CounterMT, 'counter2/')
export const Counter3 = createAggregate(CounterMT, 'counter3/')
export const store = defineStore({
  counter1: Counter1.reducerFactory({ ...CounterST, name: 'COUNTER_1' }),
  counter2: Counter2.reducerFactory({ ...CounterST, name: 'COUNTER_2', count: 10 }),
  counter3: Counter3.reducerFactory({ ...CounterST, name: 'COUNTER_3', count: 100 })
})
