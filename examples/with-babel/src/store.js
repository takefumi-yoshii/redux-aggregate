import { createStore, combineReducers, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { S as CounterS, M as CounterM } from './models/counter'

// ______________________________________________________

export function defineStore(reducer) {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

// ______________________________________________________

export const Counter = createAggregate(CounterM, 'counter/')
export const store = defineStore({
  counter: Counter.reducerFactory({ ...CounterS, name: 'COUNTER' }),
})
