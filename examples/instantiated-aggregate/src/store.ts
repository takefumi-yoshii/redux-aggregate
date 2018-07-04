import { createStore, combineReducers, Store, ReducersMapObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { CounterMT, CounterST, CounterModel } from './models/counter'

// ______________________________________________________

export interface StoreST {
  counter1: CounterST
  counter2: CounterST
  counter3: CounterST
}

// ______________________________________________________

export const Counter1 = createAggregate(CounterMT, 'counter1/')
export const Counter2 = createAggregate(CounterMT, 'counter2/')
export const Counter3 = createAggregate(CounterMT, 'counter3/')

// ______________________________________________________

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
