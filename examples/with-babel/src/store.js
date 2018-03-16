import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, reduceAggregate } from 'redux-aggregate'
import { domain } from './models/counter'

// ______________________________________________________

function defineStore(reducer) {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}
export const counter = createAggregate('counter/', domain)
export const store = defineStore({
  counter: reduceAggregate(counter, { name: 'COUNTER' })
})
