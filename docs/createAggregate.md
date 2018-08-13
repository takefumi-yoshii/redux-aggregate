# createAggregate

### ✅ Reduce boilerplate

Here we are creating them with `createAggregate`.
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

Mutaions is immutable mutate functions for state.
Generate boilerplate starting from this MutationsMap.
It be equal to behavior of Reducer.
Let provide payload as the second argument if necessary.

Related: [Define Mutations ->](mutations.md)
