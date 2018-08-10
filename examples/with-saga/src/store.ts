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
import { createAggregate, createActions } from '../../../src'
import { TimerAC } from './actions/timer'
import { CounterST, CounterMT, CounterModel, CounterSB } from './models/counter'
import { TodosST, TodosMT, TodosModel, TodosSB } from './models/todos'
import { rootSaga } from './services/counter'
import { wait } from './helper/promise'

// ______________________________________________________

export interface StoreST {
  counter: CounterST
  todos: TodosST
}

// ______________________________________________________
//
// @ Aggregates

export const Timer = createActions(TimerAC, 'timer/')
export const Counter = createAggregate(CounterMT, 'counter/')
export const Todos = createAggregate(TodosMT, 'todos/')
Todos.subscribe(Timer, TodosSB.Timer)
Counter.subscribe(Timer, CounterSB.Timer)

// ______________________________________________________
//
// @ Store

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

// ______________________________________________________
//
// @ Services

async function runTimerService() {
  while (true) {
    await wait()
    store.dispatch(Timer.creators.tick())
  }
}
store.dispatch(Timer.creators.tick())
runTimerService()

sagaMiddleware.run(rootSaga)
