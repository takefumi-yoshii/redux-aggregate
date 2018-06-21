import { createStore, combineReducers, Store, ReducersMapObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { TodosPresentST, TodosPresentMT } from './models/todos_present'

// ______________________________________________________

export function defineStore<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

// ______________________________________________________

export interface StoreST {
  todos: TodosPresentST
}
export const Todos = createAggregate(TodosPresentMT, 'todos/')
export const store = defineStore({
  todos: Todos.reducerFactory({ ...TodosPresentST, name: 'TODOS' })
})
