## Topics of this Example

In this example, static typing with TypeScript is shown.
It is effective for type definition by exporting interface definition of state and payload.

```javascript
// ______________________________________________________
//
// @ State

export interface S {
  name: string
  count: number
  a: { b: { c: string } }
}
export const S: S = {
  name: '',
  count: 0,
  a: { b: { c: 'c' } }
}

// ______________________________________________________
//
// @ Queries

function getCount(state: S): number {
  return state.count
}
function expo2(state: S): number {
  return state.count ** 2
}
export const Q = {
  getCount,
  expo2
}

// ______________________________________________________
//
// @ Mutations

export interface P {
  setNestedValue: string
}
function increment(state: S): S {
  return { ...state, count: state.count + 1 }
}
function decrement(state: S): S {
  return { ...state, count: state.count - 1 }
}
function setNestedValue(state: S, value: P['setNestedValue']): S {
  return {
    ...state, a: {
      ...state.a, b: {
        ...state.a.b, c: value
      }
    }
  }
}
export const M = {
  increment,
  decrement,
  setNestedValue
}
```

Create different instances with same aggregate.
Even if the definition files are the same, it change the target state as another action by changing the specified namespace.

```javascript
import { createAggregate } from 'redux-aggregate'
import { M, S } from './models/counter'

export interface StoreState {
  counter1: S
  counter2: S
  counter3: S
}
export const Counter1 = createAggregate(M, 'counter1/')
export const Counter2 = createAggregate(M, 'counter2/')
export const Counter3 = createAggregate(M, 'counter3/')
export const store = defineStore({
  counter1: Counter1.reducerFactory({ ...S, name: 'COUNTER_1' }),
  counter2: Counter2.reducerFactory({ ...S, name: 'COUNTER_2', count: 10 }),
  counter3: Counter3.reducerFactory({ ...S, name: 'COUNTER_3', count: 100 })
})
```