import { h, Component } from 'preact'
import { Store } from 'redux'
import { Provider} from 'preact-redux'
import { StoreST } from '../store'
import { CounterContainer } from './counter'
import { TodosContainer } from './todos'

// ______________________________________________________

class RootView extends Component<null, null> {
  render() {
    return (
      <div>
        <CounterContainer />
        <TodosContainer />
      </div>
    )
  }
}
export class AppProvider extends Component<{ store: Store<StoreST> }, null> {
  render() {
    return (
      <Provider store={this.props.store}>
        <RootView />
      </Provider>
    )
  }
}
