# redux-aggregate

[![Latest Version](https://img.shields.io/badge/npm-v0.0.6-C12127.svg)](https://www.npmjs.com/package/redux-aggregate)

The helper module making Redux more usable.
Inspired by [unistore](https://github.com/developit/unistore).
Minimum code is as follows.The comfortable code is maintain quality.

```javascript
import { createAggregate, reduceAggregate } from 'redux-aggregate'

export const counter = createAggregate('counter/', {
  state: { count: 0 },
  actions: {
    increment() { this.count++ }, // bounds state
    decrement() { this.count-- } // dotin access
  }
})

export const Store = createStore(combineReducers({
  counter: reduceAggregate(counter) // reduce to domain model
}))
```

## ✅ Reduce boilerplate

This is only a support role to use Redux.
Basic understanding of Redux and boilerplate are necessary.
Here we are creating them with `createAggregate`.
`Aggregate` contains "ActionTypes / ActionCreators / Reducer".
The first argument is a namespace.With this, ActionType won't conflict.
The second argument is a DomainObject including "state / actions / computed(optional)".

```javascript
import { createAggregate } from 'redux-aggregate'
import { state, actions } from 'path/to/domain'

const domain = { state, actions }
const { types, creators, reducer } = createAggregate('counter/', domain)
```

![image.png](https://user-images.githubusercontent.com/22139818/37502814-59e06558-2918-11e8-93b8-3033f729fbf5.png)

Processing equivalent to `Reducer` is done with `actions`.
This processed with [immer](https://github.com/mweststrate/immer) and
it is made to be able to change state to immutable with `dot in`.
Middleware can also be used as usual, it does not interfere with modular, such as `connect`.

```javascript
const state = {
  a: { b: { c: 'c' } }
}
const actions = {
  setC (value) {
    this.a.b.c = value
  }
}
export const domain = { state, actions }
```


## ✅ Give the behavior of Model to State

Normal Redux only projects the State, but depending on requirements, this will be unsatisfactory.
By giving `computed` object with methods to domain,it can add methods to use state.
**The State now has behavior as a `Model`, distance to be acquired becomes closer.**

```javascript
const state = {
  count: 0
}
const actions = {
  setCount (value) {
    this.count = value
  }
}
const computed = {
  expo2 () {
    return this.count ** 2
  }
}
export const domain = { state, actions, computed }
```
