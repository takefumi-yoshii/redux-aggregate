import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  ReducersMapObject,
  Middleware
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { createAggregate } from 'redux-aggregate'
import { rootSaga } from './services/counter'
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

const sagaMiddleware = createSagaMiddleware()

function storeFactory<R extends ReducersMapObject, M extends Middleware>(
  reducer: R,
  sagaMiddleware: M
): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )
}

export const store = storeFactory(
  {
    counter: Counter.reducerFactory(CounterModel({ name: 'COUNTER' })),
    todos: Todos.reducerFactory(TodosModel({ name: 'TODOS' }))
  },
  sagaMiddleware
)
sagaMiddleware.run(rootSaga)
