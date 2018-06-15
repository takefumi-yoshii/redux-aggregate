import { createStore, combineReducers, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, } from 'redux-aggregate'
import { mittMiddleware } from 'redux-mitt'
import { runService } from './services/counter'
import { CounterST, CounterMT } from './models/counter'
import { TodosST, TodosMT } from './models/todos'

// ______________________________________________________

export function defineStore(reducer): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(mittMiddleware())
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
runService(store)
