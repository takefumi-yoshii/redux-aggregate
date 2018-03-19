import { h, Component } from 'preact'
import { Provider, connect } from 'preact-redux'
import { Store, todos } from '../store'
import { Model, creators } from '../models/todos'
import { ConnectedComponent } from './todos'

// ______________________________________________________

interface TodosProviderProps {
  store: Store
  creators: creators
  modelName: string
}
function TodosProvider({ store, creators, modelName }: TodosProviderProps) {
  return (
    <Provider store={store}>
      <ConnectedComponent
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
        <TodosProvider
          store={store}
          creators={todos.creators}
          modelName={'todos'}
        />
      </div>
    )
  }
}
