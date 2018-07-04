import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  ReducersMapObject
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import { createAggregate } from 'redux-aggregate'
import { rootEpic } from './services/counter'
import { CounterST, CounterMT, CounterModel } from './models/counter'
import { TodosST, TodosMT, TodosModel } from './models/todos'

// ______________________________________________________

export interface StoreST {
  counter: CounterST
  todos: TodosST
}

// ______________________________________________________

export const Counter = createAggregate(CounterMT, 'counter/')
export const Todos = createAggregate(TodosMT, 'todos/')

// ______________________________________________________

function storeFactory<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(createEpicMiddleware(rootEpic)))
  )
}

export const store = storeFactory({
  counter: Counter.reducerFactory(CounterModel({ name: 'COUNTER' })),
  todos: Todos.reducerFactory(TodosModel({ name: 'TODOS' }))
})
