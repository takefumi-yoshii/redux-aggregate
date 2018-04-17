import { Store as ReduxStore } from 'redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, reduceAggregate } from 'redux-aggregate'
import { createEpicMiddleware } from 'redux-observable'
import { domain as CounterDomain } from './models/counter'
import { domain as TodosDomain } from './models/todos'
import { Model as CounterModel } from './models/counter'
import { Model as TodosModel } from './models/todos'
import { rootEpic} from './services/counter'

// ______________________________________________________

const epicMiddleware = createEpicMiddleware(rootEpic);

export function defineStore(reducer) {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(epicMiddleware))
  )
}

// ______________________________________________________

export interface AggregateRoot {
  counter?: CounterModel
  todos?: TodosModel
}
export interface Store extends ReduxStore<AggregateRoot> {
  // subscribeAction?: (type: string, action: ({ type: string, payload: any }) => void) => Function
}
export const counter = createAggregate('counter/', CounterDomain)
export const todos = createAggregate('todos/', TodosDomain)

// ______________________________________________________

export const Store = defineStore({
  counter: reduceAggregate(counter, { name: 'COUNTER' }),
  todos: reduceAggregate(todos, { name: 'TODOS' })
})
Store.dispatch({ type: 'PING' });