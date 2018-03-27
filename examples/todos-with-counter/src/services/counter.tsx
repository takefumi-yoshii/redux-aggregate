import { Store, todos, counter } from '../store'

function mapTodosCountToCounter(Store) {
  const { setTodoCount } = counter.creators
  const unsubscribe = Store.subscribeAction(
    todos.types.addTodo, action => {
      const length = Store.getState().todos.items.length
      Store.dispatch(setTodoCount(length))
    }
  )
}

export function runService(Store: Store) {
  mapTodosCountToCounter(Store)
}
