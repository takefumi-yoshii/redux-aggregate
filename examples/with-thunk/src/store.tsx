import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, reduceAggregate } from 'redux-aggregate'
import { domain } from './models/counter'
import { Model as CounterModel } from './models/counter'
import { Store as ReduxStore } from 'redux'
import thunk from 'redux-thunk'

// ______________________________________________________

export function defineStore(reducer) {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(thunk))
  )
}

// ______________________________________________________

export interface AggregateRoot {
  counter?: CounterModel
}
export interface Store extends ReduxStore<AggregateRoot> {}
export const counter = createAggregate('counter/', domain)
// ______________________________________________________

export const Store = defineStore({
  counter: reduceAggregate(counter, { name: 'COUNTER', count: 0 })
})
