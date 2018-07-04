import { createStore, combineReducers, Store, ReducersMapObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import {
  TodosPresentST,
  TodosPresentMT,
  TodosPresentModel
} from './models/todos_present'

// ______________________________________________________

export interface StoreST {
  todos: TodosPresentST
}

// ______________________________________________________

export const Todos = createAggregate(TodosPresentMT, 'todos/')

// ______________________________________________________

function storeFactory<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(combineReducers(reducer), composeWithDevTools())
}

// ______________________________________________________

export const store = storeFactory({
  todos: Todos.reducerFactory(TodosPresentModel({ name: 'TODOS' }))
})
