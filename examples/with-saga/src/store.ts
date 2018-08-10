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
import { CounterModel, CounterST, CounterMT, CounterSB } from './models/counter'
import { TodosModel, TodosST, TodosMT, TodosSB } from './models/todos'
import { SummaryModel, SummaryST, SummarySB } from './models/summary'
import { rootSaga } from './services/counter'
import { wait } from './helper/promise'

// ______________________________________________________
//
// @ Types

export interface StoreST {
  counter: CounterST
  todos: TodosST
  summary: SummaryST
}

// ______________________________________________________
//
// @ Aggregates

export const Timer = createActions(TimerAC, 'timer/')
export const Counter = createAggregate(CounterMT, 'counter/')
export const Todos = createAggregate(TodosMT, 'todos/')
export const Summary = createAggregate({}, 'summary/')
Todos.subscribe(Timer, TodosSB.Timer)
Counter.subscribe(Timer, CounterSB.Timer)
Summary.subscribe(Timer, SummarySB.Timer)
Summary.subscribe(Counter, SummarySB.Counter)
Summary.subscribe(Todos, SummarySB.Todos)

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
    counter: Counter.reducerFactory(
      CounterModel({
        name: 'COUNTER',
        bgColor: '#fff'
      })
    ),
    todos: Todos.reducerFactory(
      TodosModel({
        name: 'TODOS',
        bgColor: '#eee'
      })
    ),
    summary: Summary.reducerFactory(
      SummaryModel({
        name: 'SUMMARY',
        bgColor: '#ccc'
      })
    )
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
