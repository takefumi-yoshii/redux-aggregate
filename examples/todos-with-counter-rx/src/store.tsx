import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import { createAggregate, } from 'redux-aggregate'
import { rootEpic} from './services/counter'
import { CounterST, CounterMT } from './models/counter'
import { TodosST, TodosMT } from './models/todos'

// ______________________________________________________

export function defineStore(reducer): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(
      applyMiddleware(
        createEpicMiddleware(rootEpic)
      )
    )
  )
}

// ______________________________________________________

export interface StoreST {
  counter: CounterST
  todos: TodosST
}
export const Counter = createAggregate(CounterMT, 'counter/')
export const Todos = createAggregate(TodosMT, 'todos/')
export const store = defineStore({
  counter: Counter.reducerFactory({ ...CounterST, name: 'COUNTER' }),
  todos: Todos.reducerFactory({ ...TodosST, name: 'TODOS' })
})
