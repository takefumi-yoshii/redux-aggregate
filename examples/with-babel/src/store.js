import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { S, M } from './models/counter'

// ______________________________________________________

export function defineStore(reducer) {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

// ______________________________________________________

export const Counter = createAggregate(M, 'counter/')
export const store = defineStore({
  counter: Counter.reducerFactory({ ...S, name: 'COUNTER' })
})
