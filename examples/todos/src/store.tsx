import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, reduceAggregate } from 'redux-aggregate'
import { domain } from './models/todos'
import { Model as TodosModel } from './models/todos'
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
  todos?: TodosModel
}
export interface Store extends ReduxStore<AggregateRoot> {}
export const todos = createAggregate('todos/', domain)
// ______________________________________________________

export const Store = defineStore({
  todos: reduceAggregate(todos, { name: 'TODOS' })
})
