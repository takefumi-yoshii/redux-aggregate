# Mutations

### ✅ In most use cases are enough for this

Mutaions is immutable mutate functions for state.
Generate boilerplate starting from this MutationsMap.
It be equal to behavior of Reducer.
Let provide payload as the second argument if necessary.
**This is pure function for state.**

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

Related: [createAggregate ->](createAggregate.md)

### ❓ How to define many-to-many

If need to extract definition of Actions, use [createActions](createActions.md).  
If need to extract definition of Reducers, use [subscribe](subscribe.md) and [subscriptions](subscriptions.md).

___

### Concepts

* [Core Concepts](coreConcepts.md)
* [Inferred Types](inferredTypes.md)
* [Mutations](mutations.md)
* [ActionSrc](actionSources.md)
* [Subscriptions](subscriptions.md)
* [Queries](queries.md)

### Usage

* [APIs](apis.md)
* [createAggregate](createAggregate.md)
* [createActions](createActions.md)
* [subscribe](subscribe.md)

### Advanced Feature

* [redux-aggregate-immer](redux-aggregate-immer.md)
