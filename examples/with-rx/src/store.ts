import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  ReducersMapObject
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable'
import { createAggregate, createActions } from '../../../src'
import { TimerAC } from './actions/timer'
import { CounterST, CounterMT, CounterModel, CounterSB } from './models/counter'
import { TodosST, TodosMT, TodosModel, TodosSB } from './models/todos'
import { rootEpic } from './services/counter'
import { wait } from './helper/promise'

// ______________________________________________________
//
// @ Types

export interface StoreST {
  counter: CounterST
  todos: TodosST
}
type AppEpicMiddleware = EpicMiddleware<any, any, StoreST>

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

const epicMiddleware = createEpicMiddleware() as AppEpicMiddleware

function storeFactory<R extends ReducersMapObject, E extends AppEpicMiddleware>(
  reducer: R,
  epicMiddleware: E
): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(epicMiddleware))
  )
}
export const store = storeFactory(
  {
    counter: Counter.reducerFactory(CounterModel({ name: 'COUNTER' })),
    todos: Todos.reducerFactory(TodosModel({ name: 'TODOS' }))
  },
  epicMiddleware
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

epicMiddleware.run(rootEpic)
