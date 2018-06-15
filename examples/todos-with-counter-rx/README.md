## Topics of this Example

This example shows design pattern of choreography with rxjs.  
This design has the same pattern as `todos-with-counter`.

```javascript
// ______________________________________________________
//
// @ Todos Service

import 'rxjs'
import { Counter, Todos } from '../store'
import { combineEpics } from 'redux-observable'

function mapTodosCountToCounter(action$, store) {
  const { setTodoCount } = Counter.creators
  return action$
    .ofType(Todos.types.addTodo)
    .map(action => {
      const length = store.getState().todos.items.length
      return setTodoCount(length)
    })
}

export const rootEpic = combineEpics(
  mapTodosCountToCounter
)

```
