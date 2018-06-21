import * as React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { StoreST } from '../store'
import { CounterContainer } from './counter'

// ______________________________________________________

export class AppProvider extends React.Component<{ store: Store<StoreST> }, never> {
  render() {
    return (
      <Provider store={this.props.store}>
        <CounterContainer />
      </Provider>
    )
  }
}
