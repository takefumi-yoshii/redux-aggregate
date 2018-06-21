import { createStore, combineReducers, applyMiddleware, Store, ReducersMapObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import thunk from 'redux-thunk'
import { CounterST, CounterMT } from './models/counter'

// ______________________________________________________

export function defineStore<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(thunk))
  )
}

// ______________________________________________________

export interface StoreST {
  counter: CounterST
}
export const Counter = createAggregate(CounterMT, 'counter/')
export const store = defineStore({
  counter: Counter.reducerFactory({ ...CounterST, name: 'COUNTER' })
})
