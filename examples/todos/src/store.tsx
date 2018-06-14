import { createStore, combineReducers, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { S as TodosS, M as TodosM } from './models/todos'

// ______________________________________________________

export function defineStore(reducer): Store<StoreState> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

// ______________________________________________________

export interface StoreState {
  todos: TodosS
}
export const Todos = createAggregate(TodosM, 'todos/')
export const store = defineStore({
  todos: Todos.reducerFactory({ ...TodosS, name: 'TODOS' })
})
