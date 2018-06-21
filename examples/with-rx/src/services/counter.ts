import 'rxjs/add/operator/map'
import { Store, Action } from 'redux'
import { Epic, combineEpics } from 'redux-observable'
import { Counter, Todos } from '../store'
import { StoreST } from '../store'

const mapTodosCountToCounter: Epic<Action, StoreST> = (action$, store: Store<StoreST>) => {
  const { setTodoCount } = Counter.creators
  return action$
    .ofType(Todos.types.addTodo)
    .map(() => {
      const length = store.getState().todos.items.length
      return setTodoCount(length)
    })
}

export const rootEpic = combineEpics(
  mapTodosCountToCounter
)
