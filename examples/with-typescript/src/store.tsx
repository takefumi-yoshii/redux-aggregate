import { createStore, combineReducers, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, } from 'redux-aggregate'
import { M as CounterM, S as CounterS } from './models/counter'

// ______________________________________________________

export function defineStore(reducer): Store<StoreState> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

// ______________________________________________________

export interface StoreState {
  counter1: CounterS
  counter2: CounterS
  counter3: CounterS
}
export const Counter1 = createAggregate(CounterM, 'counter1/')
export const Counter2 = createAggregate(CounterM, 'counter2/')
export const Counter3 = createAggregate(CounterM, 'counter3/')
export const store = defineStore({
  counter1: Counter1.reducerFactory({ ...CounterS, name: 'COUNTER_1' }),
  counter2: Counter2.reducerFactory({ ...CounterS, name: 'COUNTER_2', count: 10 }),
  counter3: Counter3.reducerFactory({ ...CounterS, name: 'COUNTER_3', count: 100 })
})
