import { createStore, combineReducers, Store, ReducersMapObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { TodosST, TodosMT } from './models/todos'

// ______________________________________________________

export function defineStore<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

// ______________________________________________________

export interface StoreST {
  todos: TodosST
}
export const Todos = createAggregate(TodosMT, 'todos/')
export const store = defineStore({
  todos: Todos.reducerFactory({ ...TodosST, name: 'TODOS' })
})
