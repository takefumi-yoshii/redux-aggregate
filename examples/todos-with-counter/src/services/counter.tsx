import { Store } from 'redux'
import { StoreState, Counter, Todos } from '../store'

function mapTodosCountToCounter(store: Store<StoreState>) {
  const { setTodoCount } = Counter.creators
  return store.subscribeAction( // return unsubscriber
    Todos.types.addTodo,
    () => {
      const { todos } = store.getState()
      store.dispatch(setTodoCount(todos.items.length))
    }
  )
}

export function runService(store: Store<StoreState>) {
  mapTodosCountToCounter(store)
}
