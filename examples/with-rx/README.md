## Topics of this Example

This example shows design pattern of choreography with redux-observable.  

```javascript
// ______________________________________________________
//
// @ Counter Service

import { Action } from 'redux'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { map, withLatestFrom } from 'rxjs/operators'
import { Counter, Todos } from '../store'
import { StoreST } from '../store'

type EpicType = Epic<Action<any>, Action<any>, StoreST, any>

const mapTodosCountToCounter: EpicType = (action$, state$) => {
  const { setTodoCount } = Counter.creators
  return action$.pipe(
    ofType(Todos.types.addTodo),
    withLatestFrom(state$),
    map(([, state]) => setTodoCount(state.todos.items.length))
  )
}

export const rootEpic = combineEpics(mapTodosCountToCounter)

```
