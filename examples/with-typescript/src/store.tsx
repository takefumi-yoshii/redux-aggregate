import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, reduceAggregate } from 'redux-aggregate'
import { domain } from './models/counter'
import { Model as CounterModel } from './models/counter'
import { Store as ReduxStore } from 'redux'

// ______________________________________________________

export function defineStore(reducer) {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

// ______________________________________________________

export interface AggregateRoot {
  counter1?: CounterModel
  counter2?: CounterModel
  counter3?: CounterModel
}
export interface Store extends ReduxStore<AggregateRoot> {}
export const counter1 = createAggregate('counter1/', domain)
export const counter2 = createAggregate('counter2/', domain)
export const counter3 = createAggregate('counter3/', domain)
// ______________________________________________________

export const Store = defineStore({
  counter1: reduceAggregate(counter1, { name: 'COUNTER1', count: 0 }),
  counter2: reduceAggregate(counter2, { name: 'COUNTER2', count: 10 }),
  counter3: reduceAggregate(counter3, { name: 'COUNTER3', count: 100 })
})
