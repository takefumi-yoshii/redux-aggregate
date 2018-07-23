import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  ReducersMapObject
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable'
import { createAggregate } from 'redux-aggregate'
import { rootEpic } from './services/counter'
import { CounterST, CounterMT, CounterModel } from './models/counter'
import { TodosST, TodosMT, TodosModel } from './models/todos'

// ______________________________________________________

export interface StoreST {
  counter: CounterST
  todos: TodosST
}
type AppEpicMiddleware = EpicMiddleware<any, any, StoreST>

// ______________________________________________________

export const Counter = createAggregate(CounterMT, 'counter/')
export const Todos = createAggregate(TodosMT, 'todos/')

// ______________________________________________________

const epicMiddleware = createEpicMiddleware() as AppEpicMiddleware

function storeFactory<R extends ReducersMapObject, E extends AppEpicMiddleware>(
  reducer: R,
  epicMiddleware: E
): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools(applyMiddleware(epicMiddleware))
  )
}

export const store = storeFactory(
  {
    counter: Counter.reducerFactory(CounterModel({ name: 'COUNTER' })),
    todos: Todos.reducerFactory(TodosModel({ name: 'TODOS' }))
  },
  epicMiddleware
)

epicMiddleware.run(rootEpic)
