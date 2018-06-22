## Topics of this Example

This sample is the simplest configuration. Create a store instance with store.js.

```javascript
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate } from 'redux-aggregate'
import { CounterModel, CounterMT } from './models/counter'

// ______________________________________________________

export const Counter = createAggregate(CounterMT, 'counter/')

// ______________________________________________________

function storeFactory(reducer) {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

export const store = storeFactory({
  counter: Counter.reducerFactory(
    CounterModel({ name: 'COUNTER' })
  )
})

```

The Aggregate generate from Mutations. Queries is optional, but by using it,
it becomes possible to calculate the necessary value from the value to be held,
and it will be effective in various situations.

```javascript
// ______________________________________________________
//
// @ Model

export const CounterModel = injects => ({
  name: '',
  count: 0,
  styled: { bg: '#fff' },
  ...injects
})

// ______________________________________________________
//
// @ Queries

function expo2(state) {
  return state.count ** 2
}
export const CounterQR = { expo2 }

// ______________________________________________________
//
// @ Mutations

function increment(state) {
  return { ...state, count: state.count + 1 }
}
function decrement(state) {
  return { ...state, count: state.count - 1 }
}
export const CounterMT = { increment, decrement }

```