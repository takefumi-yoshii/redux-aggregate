## Topics of this Example

In this example, static typing with TypeScript is shown.
It is effective for type definition by exporting interface definition of state and payload.

```javascript
// ______________________________________________________
//
// @ State

export interface CounterST {
  name: string
  count: number
  a: { b: { c: string } }
}
export const CounterST: CounterST = {
  name: '',
  count: 0,
  a: { b: { c: 'c' } }
}

// ______________________________________________________
//
// @ Queries

function getCount(state: CounterST): number {
  return state.count
}
function expo2(state: CounterST): number {
  return state.count ** 2
}
export const CounterQR = {
  getCount,
  expo2
}

// ______________________________________________________
//
// @ Mutations

function increment(state: CounterST): CounterST {
  return { ...state, count: state.count + 1 }
}
function decrement(state: CounterST): CounterST {
  return { ...state, count: state.count - 1 }
}
function setNestedValue(state: CounterST, value: string): CounterST {
  return {
    ...state, a: {
      ...state.a, b: {
        ...state.a.b, c: value
      }
    }
  }
}
export const CounterMT = {
  increment,
  decrement,
  setNestedValue
}

```

Create different instances with same aggregate.
Even if the definition files are the same, it change the target state as another action by changing the specified namespace.

```javascript
import { createAggregate } from 'redux-aggregate'
import { CounterMT, CounterST } from './models/counter'

export interface StoreST {
  counter1: CounterST
  counter2: CounterST
  counter3: CounterST
}
export const Counter1 = createAggregate(CounterMT, 'counter1/')
export const Counter2 = createAggregate(CounterMT, 'counter2/')
export const Counter3 = createAggregate(CounterMT, 'counter3/')
export const store = storeFactory({
  counter1: Counter1.reducerFactory({ ...CounterST, name: 'COUNTER_1' }),
  counter2: Counter2.reducerFactory({ ...CounterST, name: 'COUNTER_2', count: 10 }),
  counter3: Counter3.reducerFactory({ ...CounterST, name: 'COUNTER_3', count: 100 })
})
```