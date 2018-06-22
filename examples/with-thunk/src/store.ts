import { createStore, combineReducers, applyMiddleware, Store, ReducersMapObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import thunk from 'redux-thunk'
import { CounterST, CounterMT, CounterModel } from './models/counter'

// ______________________________________________________

export interface StoreST {
  counter: CounterST
}

// ______________________________________________________

export const Counter = createAggregate(CounterMT, 'counter/')

// ______________________________________________________

function storeFactory<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(thunk))
  )
}

export const store = storeFactory({
  counter: Counter.reducerFactory(
    CounterModel({name: 'COUNTER' })
  )
})
