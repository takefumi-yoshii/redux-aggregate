import { createStore, combineReducers, Store, ReducersMapObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, createActions } from '../../../src'
import { TimerAC } from './actions/timer'
import { CounterMT, CounterST, CounterModel, CounterSB } from './models/counter'
import { wait } from './helper/promise'

// ______________________________________________________
//
// @ Types

export interface StoreST {
  counter1: CounterST
  counter2: CounterST
  counter3: CounterST
}

// ______________________________________________________
//
// @ Aggregates

export const Timer = createActions(TimerAC, 'timer/')
export const Counter1 = createAggregate(CounterMT, 'counter1/')
export const Counter2 = createAggregate(CounterMT, 'counter2/')
export const Counter3 = createAggregate(CounterMT, 'counter3/')
Counter1.subscribe(Timer, CounterSB.Timer)
Counter2.subscribe(Timer, CounterSB.Timer)
Counter3.subscribe(Timer, CounterSB.Timer)

// ______________________________________________________
//
// @ Store

function storeFactory<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(combineReducers(reducer), composeWithDevTools())
}

export const store = storeFactory({
  counter1: Counter1.reducerFactory(
    CounterModel({
      name: 'COUNTER_1',
      count: 0,
      bgColor: '#ccc'
    })
  ),
  counter2: Counter2.reducerFactory(
    CounterModel({
      name: 'COUNTER_2',
      count: 10,
      bgColor: '#eee'
    })
  ),
  counter3: Counter3.reducerFactory(
    CounterModel({
      name: 'COUNTER_3',
      count: 100,
      bgColor: '#fff'
    })
  )
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
