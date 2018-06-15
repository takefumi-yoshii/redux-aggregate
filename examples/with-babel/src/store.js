import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { CounterST, CounterMT } from './models/counter'

// ______________________________________________________

export function defineStore(reducer) {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

// ______________________________________________________

export const Counter = createAggregate(CounterMT, 'counter/')
export const store = defineStore({
  counter: Counter.reducerFactory({ ...CounterST, name: 'COUNTER' })
})
