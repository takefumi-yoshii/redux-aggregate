import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { CounterModel, CounterMT } from './models/counter'

// ______________________________________________________

export const Counter = createAggregate(CounterMT, 'counter/')

// ______________________________________________________

function storeFactory(reducer) {
  return createStore(combineReducers(reducer), composeWithDevTools())
}

export const store = storeFactory({
  counter: Counter.reducerFactory(CounterModel({ name: 'COUNTER' }))
})
