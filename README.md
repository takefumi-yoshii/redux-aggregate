# redux-aggregate

[![Latest Version](https://img.shields.io/badge/npm-redux_aggregate-C12127.svg)](https://www.npmjs.com/package/redux-aggregate)
[![CircleCI](https://circleci.com/gh/takefumi-yoshii/redux-aggregate.svg?style=svg)](https://circleci.com/gh/takefumi-yoshii/redux-aggregate)

The tiny ~550b helper module making Redux more usable.
Inspired by [unistore](https://github.com/developit/unistore).
Minimum code is as follows.The comfortable code is maintain quality.

```javascript
import { createStore, combineReducers } from 'redux'
import { createAggregate } from 'redux-aggregate'

const state = { count: 0 }
const increment = s => ({ ...s, count: s.count + 1 })
const decrement = s => ({ ...s, count: s.count - 1 })
const mutations = { increment, decrement }
const { reducerFactory } = createAggregate(mutations, 'counter/')
const store = createStore(
  combineReducers({
    counter: reducerFactory({ ...state })
  })
)
```

This is only a support role to use Redux.
Basic understanding of Redux and boilerplate are necessary.

## ✅ Reduce boilerplate

Here we are creating them with `createAggregate`.
`Aggregate` contains "ActionTypes / ActionCreators / ReducerFactory".
The first argument is `Mutations`, a set of mutate functions.
The second argument is a unique namespace.With this, ActionType won't conflict.

```javascript
import { createAggregate } from 'redux-aggregate'
import { mutations } from 'path/to/model'
const {
  types,         // Generated ActionTypes
  creators,      // Generated ActionCreators
  reducerFactory // Generated ReducerFactory
} = createAggregate(mutations, 'counter/')
```

Mutaions is immutable mutate functions for state.
Generate boilerplate starting from this MutationsMap.
It be equal to behavior of Reducer.
Let provide payload as the second argument if necessary.

```javascript
//
// @ Mutations

function increment(s) {
  return { ...s, count: s.count + 1 }
}
function decrement(s) {
  return { ...s, count: s.count - 1 }
}
function setCount (s, value) {
  return { ...s, count: value }
}
export const Mutations = {
  increment,
  decrement,
  setCount
}
```
This kind of action occurs.

![image.png](https://user-images.githubusercontent.com/22139818/37502814-59e06558-2918-11e8-93b8-3033f729fbf5.png)


## ✅ Give the behavior of Model to State

Normal Redux only projects the State, but depending on requirements, this will be unsatisfactory.
By focusing on the state in the same file scope, it can add methods to use state.
**The State now has behavior as a `Model`, It same as `computed` in another library.**
Export as necessary and have it function as a public method.
Be careful to handle the state schema immediately above.

```javascript
const state = {
  count: 0,
  unit: 'pt'
}
//
// @ Queries

function expo2 (s) {
  return s.count ** 2
}
function getCountLabel (s) {
  return `${s.count}${s.unit}`
}
export const Queries = {
  expo2,
  getCountLabel
}

```

## 🔥 Type inference in conditional types

By the map of Type inference in conditional types, 
mutation's second argument will map to action creator's payload.
(required ^TypeScript 2.8)

![image.png](https://user-images.githubusercontent.com/22139818/41963075-a5b09a9c-7a31-11e8-8452-868258768fee.png)