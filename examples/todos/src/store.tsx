import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { S as TodosS, M as TodosM } from './models/todos'
import { Store as ReduxStore } from 'redux'

// ______________________________________________________

export interface StoreState {
  todos: TodosS
}
export const Todos = createAggregate(TodosM, 'todos/')
export const store = defineStore({
  todos: Todos.reducerFactory({ ...TodosS, name: 'TODOS' })
})

// ______________________________________________________

export function defineStore(reducer): ReduxStore<StoreState> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}
