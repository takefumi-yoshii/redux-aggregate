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
const pingEpic = action$ =>
  action$.filter(action => action.type === 'PING')
    .mapTo({ type: 'PONG' });

export const rootEpic = combineEpics(
  mapTodosCountToCounter,
  pingEpic
)
