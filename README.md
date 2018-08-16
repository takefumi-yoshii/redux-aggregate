# <img src='https://user-images.githubusercontent.com/22139818/43042403-c7b57bbe-8db7-11e8-8538-88baaf8a9f32.png' width='285' height='60' alt='redux-aggregate' />

[![Latest Version](https://img.shields.io/badge/npm-redux_aggregate-C12127.svg)](https://www.npmjs.com/package/redux-aggregate)
[![CircleCI](https://circleci.com/gh/takefumi-yoshii/redux-aggregate.svg?style=svg)](https://circleci.com/gh/takefumi-yoshii/redux-aggregate)

The tiny ~550b helper module making Redux more usable.Inspired by [unistore](https://github.com/developit/unistore).State management is core of the application.The purpose of this library is to make the application core independent by pure language specification.This is only a support role to use Redux. Basic understanding of Redux and boilerplate are necessary.

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

## 🔥 Surprisingly small type definition

By the map of Type inference in conditional types, 
mutation's second argument will map to action creator's payload.
(required ^TypeScript 2.8)

![image.png](https://redux-aggregate.js.org/assets/type_inference_in_conditional_types_mutation.png)


## 🚀 Accelerate development

Here we are creating Redux boilerplate with `createAggregate`. 
`Aggregate` contains `ActionTypes / ActionCreators / ReducerFactory`.
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

**By this alone, completed to define ActionTypes/ActionCreators/ReducerFactory with inferred type.**

Mutaions is immutable mutate functions for state.
Generate boilerplate starting from this MutationsMap.
It be equal to behavior of Reducer.
Let provide payload as the second argument if necessary.

```javascript
const state = {
  count: 0,
  unit: 'pt'
}
// ______________________________________________________
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


## 🌎 Anything will happen

`createActions` return `ActionTypes / ActionCreators`.
First argument is map of `ActionSources`.
Second argument is a unique namespace.With this, ActionType won't conflict.

```javascript
import { createActions } from 'redux-aggregate'
import { ActionSources } from 'path/to/actions/timer'
const {
  types,    // Generated ActionTypes
  creators  // Generated ActionCreators
} = createActions(ActionSources, 'timer/')
```

**By this alone, completed to define ActionTypes/ActionCreators with inferred type.**

ActionSources for `createActions` is just a pure javascript function's map. Arguments is optional.

```javascript
// ______________________________________________________
//
// @ ActionSources

function tick(message) {
  const date = new Date()
  if (message !== undefined) return { date }
  return { date, message }
}
export const ActionSources = { tick }
```


## 📡 Caught outside Actions

Aggregate contain method of `subscribe` action.
In the example below, subscribe TimerActions.

```javascript
import { createAggregate, createActions } from 'redux-aggregate'
import { TimerAC } from './actions/timer'
import { TodosMT, TodosSB } from './models/todos'
// ______________________________________________________
//
// @ Aggregates

export const Timer = createActions(TimerAC, 'timer/')
export const Todos = createAggregate(TodosMT, 'todos/')
Todos.subscribe(Timer, TodosSB.Timer)
```

The map of `Subscriptions`, It looks very much like mutations.  
**But, that will not to generete ActionCreator / ActionTypes.**  
That's exactly what unit reducer.

## Documents

[https://redux-aggregate.js.org/](https://redux-aggregate.js.org/)
