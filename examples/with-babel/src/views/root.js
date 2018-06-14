import { Component } from 'preact'
import { Store } from 'redux'
import { Provider } from 'preact-redux'
import { CounterContainer } from './counter'

// ______________________________________________________

export class AppProvider extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <CounterContainer />
      </Provider>
    )
  }
}
