## Topics of this Example

This example shows design pattern of choreography.  
The [redux-mitt](https://www.npmjs.com/package/redux-mitt) is simple middleware to subscribe actions.


```javascript
// ______________________________________________________
//
// @ Todos Service

import { Store } from 'redux'
import { StoreST, Counter, Todos } from '../store'

function mapTodosCountToCounter(store: Store<StoreST>) {
  const { setTodoCount } = Counter.creators
  return store.subscribeAction( // return unsubscriber
    Todos.types.addTodo,
    () => {
      const { todos } = store.getState()
      store.dispatch(setTodoCount(todos.items.length))
    }
  )
}

export function runService(store: Store<StoreST>) {
  mapTodosCountToCounter(store)
}

```
