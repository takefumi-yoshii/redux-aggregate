import { Component } from 'preact'
import { Provider } from 'preact-redux'
import { counter } from '../store'
import { ConnectedComponent } from './counter'
// ______________________________________________________

function CounterProvider({ store, actions, modelName }) {
  return (
    <Provider store={store}>
      <ConnectedComponent
        actions={actions}
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
          actions={counter.creators}
          modelName={'counter'}
        />
      </div>
    )
  }
}
