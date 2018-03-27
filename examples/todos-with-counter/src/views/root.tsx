import { h, Component } from 'preact'
import { Provider, connect } from 'preact-redux'
import { Store, todos, counter } from '../store'
import { creators as TodosCreators } from '../models/todos'
import { creators as CounterCreators } from '../models/counter'
import { ConnectedComponent as Counter } from './counter'
import { ConnectedComponent as Todos } from './todos'

// ______________________________________________________

interface ProviderProps {
  store: Store
  modelName: string
}
function CounterProvider({
  store,
  modelName,
  creators
}: ProviderProps & { creators: CounterCreators }) {
  return (
    <Provider store={store}>
      <Counter
        creators={creators}
        modelName={modelName}
      />
    </Provider>
  )
}
function TodosProvider({
  store,
  modelName,
  creators
}: ProviderProps & { creators: TodosCreators }) {
  return (
    <Provider store={store}>
      <Todos
        creators={creators}
        modelName={modelName}
      />
    </Provider>
  )
}
// ______________________________________________________

export class RootView extends Component<{ store: Store }, null> {
  render() {
    const { store } = this.props
    return (
      <div>
        <CounterProvider
          store={store}
          creators={counter.creators}
          modelName={'counter'}
        />
        <TodosProvider
          store={store}
          creators={todos.creators}
          modelName={'todos'}
        />
      </div>
    )
  }
}
