import { h, Component } from 'preact'
import { Provider, connect } from 'preact-redux'
import { Store, counter1, counter2, counter3 } from '../store'
import { Model, creators } from '../models/counter'
import { ConnectedComponent } from './counter'

// ______________________________________________________

interface CounterProviderProps {
  store: Store
  creators: creators
  modelName: string
}
function CounterProvider({ store, creators, modelName }: CounterProviderProps) {
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
        <CounterProvider
          store={store}
          creators={counter1.creators}
          modelName={'counter1'}
        />
        <CounterProvider
          store={store}
          creators={counter2.creators}
          modelName={'counter2'}
        />
        <CounterProvider
          store={store}
          creators={counter3.creators}
          modelName={'counter3'}
        />
      </div>
    )
  }
}
