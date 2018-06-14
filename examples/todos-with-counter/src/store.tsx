import { createStore, combineReducers, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, } from 'redux-aggregate'
import { mittMiddleware } from 'redux-mitt'
import { runService } from './services/counter'
import { S as CounterS, M as CounterM } from './models/counter'
import { S as TodosS, M as TodosM } from './models/todos'

// ______________________________________________________

export function defineStore(reducer): Store<StoreState> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(mittMiddleware())
  )
}

// ______________________________________________________

export interface StoreState {
  counter: CounterS
  todos: TodosS
}
export const Counter = createAggregate(CounterM, 'counter/')
export const Todos = createAggregate(TodosM, 'todos/')
export const store = defineStore({
  counter: Counter.reducerFactory({ ...CounterS, name: 'COUNTER' }),
  todos: Todos.reducerFactory({ ...TodosS, name: 'TODOS' })
})
runService(store)
