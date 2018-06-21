import * as React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { StoreST } from '../store'
import { TodosContainer } from './todos'

// ______________________________________________________

export class AppProvider extends React.Component<{ store: Store<StoreST> }, never> {
  render() {
    return (
      <Provider store={this.props.store}>
        <TodosContainer />
      </Provider>
    )
  }
}
