import { createStore, combineReducers, Store, ReducersMapObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, createActions } from '../../../src'
import { TimerAC } from './actions/timer'
import { TodosST, TodosMT, TodosModel, TodosSB } from './models/todos'
import { wait } from './helper/promise'

// ______________________________________________________
//
// @ Types

export interface StoreST {
  todos: TodosST
}

// ______________________________________________________
//
// @ Aggregates

export const Timer = createActions(TimerAC, 'timer/')
export const Todos = createAggregate(TodosMT, 'todos/')
Todos.subscribe(Timer, TodosSB.Timer)

// ______________________________________________________
//
// @ Store

function storeFactory<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(combineReducers(reducer), composeWithDevTools())
}
export const store = storeFactory({
  todos: Todos.reducerFactory(TodosModel({ name: 'TODOS' }))
})

// ______________________________________________________
//
// @ Services

async function runTimerService() {
  while(true) {
    await wait()
    store.dispatch(Timer.creators.tick())
  }
}
store.dispatch(Timer.creators.tick())
runTimerService()
