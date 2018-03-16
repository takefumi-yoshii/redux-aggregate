import { h, Component } from 'preact'
import { Provider, connect } from 'preact-redux'
import { Store, counter1, counter2, counter3 } from '../store'
import { Model, actions } from '../models/counter'
import { ConnectedComponent } from './counter'
// ______________________________________________________

interface CounterProviderProps {
  store: Store
  actions: actions
  modelName: string
}
function CounterProvider({ store, actions, modelName }: CounterProviderProps) {
  return (
    <Provider store={store}>
      <ConnectedComponent
        actions={actions}
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
          actions={counter1.creators}
          modelName={'counter1'}
        />
        <CounterProvider
          store={store}
          actions={counter2.creators}
          modelName={'counter2'}
        />
        <CounterProvider
          store={store}
          actions={counter3.creators}
          modelName={'counter3'}
        />
      </div>
    )
  }
}
