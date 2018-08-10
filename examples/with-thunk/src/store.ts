import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  ReducersMapObject
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, createActions } from '../../../src'
import thunk from 'redux-thunk'
import { TimerAC } from './actions/timer'
import { CounterST, CounterMT, CounterModel, CounterSB } from './models/counter'
import { wait } from './helper/promise'

// ______________________________________________________
//
// @ Types

export interface StoreST {
  counter: CounterST
}

// ______________________________________________________
//
// @ Aggregates

export const Timer = createActions(TimerAC, 'timer/')
export const Counter = createAggregate(CounterMT, 'counter/')
Counter.subscribe(Timer, CounterSB.Timer)

// ______________________________________________________
//
// @ Store

function storeFactory<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(thunk))
  )
}
export const store = storeFactory({
  counter: Counter.reducerFactory(CounterModel({ name: 'COUNTER' }))
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
