# redux-aggregate

[![Latest Version](https://img.shields.io/badge/npm-v1.1.1-C12127.svg)](https://www.npmjs.com/package/redux-aggregate)

The helper module making Redux more usable.
Inspired by [unistore](https://github.com/developit/unistore).
Minimum code is as follows.The comfortable code is maintain quality.

```javascript
import { createAggregate } from 'redux-aggregate'

const state = { count: 0 }
const increment = s => ({ ...s, count: s.count + 1 })
const decrement = s => ({ ...s, count: s.count - 1 })
const mutations = { increment, decrement }
export const { reducerFactory } = createAggregate(mutations, 'counter/')

export const Store = createStore(
  combineReducers({
    counter: reducerFactory({ ...state })
  })
)
```

## ✅ Reduce boilerplate

This is only a support role to use Redux.
Basic understanding of Redux and boilerplate are necessary.
Here we are creating them with `createAggregate`.
`Aggregate` contains "ActionTypes / ActionCreators / ReducerFactory".
The first argument is a DomainObject including "state / actions / computed(optional)".
The second argument is a unique namespace.With this, ActionType won't conflict.

```javascript
import { createAggregate } from 'redux-aggregate'
import { state, mutations } from 'path/to/domain'
const {
  types,         // Generated ActionTypes
  creators,      // Generated ActionCreators
  reducerFactory // Generated ReducerFactory
} = createAggregate(mutations, 'counter/')
```

![image.png](https://user-images.githubusercontent.com/22139818/37502814-59e06558-2918-11e8-93b8-3033f729fbf5.png)


## ✅ Give the behavior of Model to State

Normal Redux only projects the State, but depending on requirements, this will be unsatisfactory.
By focusing on the state in the same file scope, it can add methods to use state.
**The State now has behavior as a `Model`, distance to be acquired becomes closer.**

```javascript
/*
  Pure state object.
  This state is cloned and kept in the Store,
  and that functions below this handle it.
  Please note do not use this instance.
*/
export const state = {
  count: 0,
  unit: 'pt'
}
/*
  Query methods for state.
  Be careful to handle the state schema immediately above.
  Export as necessary and have it function as a public method.
*/
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
/*
  Mutation methods for state.
  Generate boilerplate starting from this functions name.
  It be equal to behavior of Reducer.
  The second argument is payload.
*/
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
