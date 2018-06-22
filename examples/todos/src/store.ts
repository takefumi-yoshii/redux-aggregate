import { createStore, combineReducers, Store, ReducersMapObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { TodosST, TodosMT, TodosModel } from './models/todos'

// ______________________________________________________

export interface StoreST {
  todos: TodosST
}

// ______________________________________________________

export const Todos = createAggregate(TodosMT, 'todos/')

// ______________________________________________________

function storeFactory<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

// ______________________________________________________

export const store = storeFactory({
  todos: Todos.reducerFactory(
    TodosModel({ name: 'TODOS' })
  )
})
