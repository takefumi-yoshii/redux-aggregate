import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, } from 'redux-aggregate'
import thunk from 'redux-thunk'
import { S as CounterS, M as CounterM } from './models/counter'

// ______________________________________________________

export function defineStore(reducer): Store<StoreState> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(thunk))
  )
}

// ______________________________________________________

export interface StoreState {
  counter: CounterS
}
export const Counter = createAggregate(CounterM, 'counter/')
export const store = defineStore({
  counter: Counter.reducerFactory({ ...CounterS, name: 'COUNTER' })
})
