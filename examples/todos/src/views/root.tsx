import { h, Component } from 'preact'
import { Store } from 'redux'
import { Provider} from 'preact-redux'
import { StoreState } from '../store'
import { TodosContainer } from './todos'

// ______________________________________________________

export class AppProvider extends Component<{ store: Store<StoreState> }, null> {
  render() {
    return (
      <Provider store={this.props.store}>
        <TodosContainer />
      </Provider>
    )
  }
}
