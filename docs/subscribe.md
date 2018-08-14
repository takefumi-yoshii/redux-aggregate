# Subscribe

### ❓ How to caught outside actions?

Aggregate contain method of `subscribe` action.
In the example below, subscribe TimerActions.

```javascript
import { createAggregate, createActions } from 'redux-aggregate'
import { TimerAC } from './actions/timer'
import { TodosMT, TodosSB, TodosModel } from './models/todos'
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

___

* [Core Concepts](coreConcepts.md)
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
