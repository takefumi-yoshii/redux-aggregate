# <img src='https://user-images.githubusercontent.com/22139818/43042403-c7b57bbe-8db7-11e8-8538-88baaf8a9f32.png' width='285' height='60' alt='redux-aggregate' />

[![Latest Version](https://img.shields.io/badge/npm-redux_aggregate-C12127.svg)](https://www.npmjs.com/package/redux-aggregate)
[![CircleCI](https://circleci.com/gh/takefumi-yoshii/redux-aggregate.svg?style=svg)](https://circleci.com/gh/takefumi-yoshii/redux-aggregate)

The tiny ~550b helper module making Redux more usable.
Inspired by [unistore](https://github.com/developit/unistore).
Minimum code is as follows.The comfortable code is maintain quality.  

```javascript
import { createStore, combineReducers } from 'redux'
import { createAggregate } from 'redux-aggregate'

const initialState = => ({ count: 0 })
const increment = state => ({ ...state, count: state.count + 1 })
const decrement = state => ({ ...state, count: state.count - 1 })
const mutations = { increment, decrement }
const { reducerFactory } = createAggregate(mutations, 'counter/')
const store = createStore(
  combineReducers({
    counter: reducerFactory(initialState())
  })
)
```

This is only a support role to use Redux.
Basic understanding of Redux and boilerplate are necessary.

## ✅ Reduce boilerplate

Here we are creating them with `createAggregate`.
`Aggregate` contains "ActionTypes / ActionCreators / ReducerFactory".
The first argument is `Mutations`, a map of mutate functions.
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

function increment(state) {
  return { ...state, count: state.count + 1 }
}
function decrement(state) {
  return { ...state, count: state.count - 1 }
}
function setCount (state, value) {
  return { ...state, count: value }
}
export const Mutations = {
  increment,
  decrement,
  setCount
}
```
This kind of action occurs.

![image.png](https://user-images.githubusercontent.com/22139818/37502814-59e06558-2918-11e8-93b8-3033f729fbf5.png)


## 🔥 Type inference in conditional types

By the map of Type inference in conditional types, 
mutation's second argument will map to action creator's payload.
(required ^TypeScript 2.8)

![image.png](https://user-images.githubusercontent.com/22139818/43045685-06523d54-8df8-11e8-95fa-fe3423e45109.png)


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

function expo2 (state) {
  return state.count ** 2
}
function getCountLabel (state) {
  return `${state.count}${state.unit}`
}
export const Queries = {
  expo2,
  getCountLabel
}
```

## How to extract define actions?

Use `createActions`. This api return "ActionTypes / ActionCreators".
The first argument is `ActionSrc`, a map of pure functions.
ActionSrc function has no more than one argument.Other than that, it's free.
The second argument is a unique namespace.With this, ActionType won't conflict.

```javascript
import { createActions } from 'redux-aggregate'
import { actionSrc } from 'path/to/model'
const {
  types,        // Generated ActionTypes
  creators      // Generated ActionCreators
} = createActions(actionSrc, 'timer/')
```

```javascript
function tick() {
  return new Date()
}
function notifyProgressMessage(amount) {
  return { messaga: `passed time is ${amount}` }
}
export const actionSrc = {
  tick,
  notifyProgress
}
```

**By this alone, completed to define AcrtionCreators with inferred type.**

## How to caught another actions/aggregate action?

Aggregate contain method of `subscribe` action.
In the example below, subscribe to what I defined earlier.

```javascript
import { createAggregate, createActions } from 'redux-aggregate'
import { TimerActions } from './actions/timer'
import { TodosMutations, TodosSubscriptions, TodosModel } from './models/todos'
// ______________________________________________________
//
// @ Aggregates

export const Timer = createActions(TimerActions, 'timer/')
export const Todos = createAggregate(TodosMutations, 'todos/')
Todos.subscribe(Timer, TodosSubscriptions.Timer)
```

The map of `Subscriptions`, It looks very much like mutations.
**But, that will not to generete ActionCreator / ActionTypes.**
That's exactly what unit reducer.

The subscription first argument take state of file scope.
**The method name and the payload schema have already been determined.**
Because, subscription follow origin what you defined.
The only remaining work is to define change the state.


```javascript
export const TodosSubscriptions = {
  Timer: {
    tick(state, date) {
      if (!state.shouldUpdateTimerView) return state
      return { ...state, date }
    }
    notifyProgressMessage(state, { message }) {
      return { ...state, messegaFromTimer: message }
    }
  }
}

```
In the same way, aggregate can subscribe another aggregate actions.
But, this approach will be obscure that action orner.
If that action is interest of crossover, it would be better to fefine as neutral.
