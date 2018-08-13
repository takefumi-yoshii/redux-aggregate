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

Related: [Mutations for createAggregate ->](createAggregate.md)

### ❓ How to define many-to-many

If you need extract define action, use [createActions](createActions.md).
If you need extract define reducer, use [subscribe](subscribe.md) and [subscriptions](subscriptions.md).

___

* [Concepts](concepts.md)
  * [Inferred Types](inferredTypes.md)
  * [Mutations](mutations.md)
  * [ActionSrc](actionSources.md)
  * [Subscriptions](subscriptions.md)
  * [Queries](queries.md)

* [APIs](apis.md)
  * [createAggregate](createAggregate.md)
  * [createActions](createActions.md)
  * [subscribe](subscribe.md)

* [Advanced](advanced.md)
