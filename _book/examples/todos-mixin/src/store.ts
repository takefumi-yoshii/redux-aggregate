import { createStore, combineReducers, Store, ReducersMapObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, createActions } from 'redux-aggregate'
import { TimerAC } from './actions/timer'
import {
  TodosPresentST,
  TodosPresentMT,
  TodosPresentModel
} from './models/todos_present'
import { TodosSB } from './models/todos'
import { wait } from './helper/promise'

// ______________________________________________________
//
// @ Types

export interface StoreST {
  todos: TodosPresentST
}

// ______________________________________________________
//
// @ Aggregates

export const Timer = createActions(TimerAC, 'timer/')
export const Todos = createAggregate(TodosPresentMT, 'todos/')
Todos.subscribe(Timer, TodosSB.Timer)

// ______________________________________________________
//
// @ Store

function storeFactory<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(combineReducers(reducer), composeWithDevTools())
}
export const store = storeFactory({
  todos: Todos.reducerFactory(TodosPresentModel({ name: 'TODOS' }))
})

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
