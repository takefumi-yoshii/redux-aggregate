import { h, Component } from 'preact'
import { Store } from 'redux'
import { Provider} from 'preact-redux'
import { StoreST } from '../store'
import { CounterContainer } from './counter'

// ______________________________________________________

export class AppProvider extends Component<{ store: Store<StoreST> }, null> {
  render() {
    return (
      <Provider store={this.props.store}>
        <CounterContainer />
      </Provider>
    )
  }
}
