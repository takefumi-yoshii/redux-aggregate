import * as React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { StoreST } from '../store'
import { CounterContainer } from './counter'
import { TodosContainer } from './todos'

// ______________________________________________________

class RootView extends React.Component<{}, never> {
  render() {
    return (
      <div>
        <CounterContainer />
        <TodosContainer />
      </div>
    )
  }
}
export class AppProvider extends React.Component<{ store: Store<StoreST> }, never> {
  render() {
    return (
      <Provider store={this.props.store}>
        <RootView />
      </Provider>
    )
  }
}
