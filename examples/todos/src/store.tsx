import { createStore, combineReducers, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { TodosST, TodosMT } from './models/todos'

// ______________________________________________________

export function defineStore(reducer): Store<StoreState> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

// ______________________________________________________

export interface StoreState {
  todos: TodosST
}
export const Todos = createAggregate(TodosMT, 'todos/')
export const store = defineStore({
  todos: Todos.reducerFactory({ ...TodosST, name: 'TODOS' })
})
