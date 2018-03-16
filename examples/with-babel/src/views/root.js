import { Component } from 'preact'
import { Provider } from 'preact-redux'
import { counter } from '../store'
import { ConnectedComponent } from './counter'

// ______________________________________________________

function CounterProvider({ store, creators, modelName }) {
  return (
    <Provider store={store}>
      <ConnectedComponent
        creators={creators}
        modelName={modelName}
      />
    </Provider>
  )
}

export class RootView extends Component {
  render() {
    const { store } = this.props
    return (
      <div>
        <CounterProvider
          store={store}
          creators={counter.creators}
          modelName={'counter'}
        />
      </div>
    )
  }
}
