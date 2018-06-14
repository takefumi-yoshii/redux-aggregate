import { h, Component } from 'preact'
import { Store } from 'redux'
import { Provider } from 'preact-redux'
import { StoreState } from '../store'
import { CounterContainer1, CounterContainer2, CounterContainer3 } from './counter'

// ______________________________________________________

class RootView extends Component<null, null> {
  render () {
    return (
      <div>
        <CounterContainer1 />
        <CounterContainer2 />
        <CounterContainer3 />
      </div>
    )
  }
}
export class AppProvider extends Component<{ store: Store<StoreState> }, null> {
  render() {
    return (
      <Provider store={this.props.store}>
        <RootView/>
      </Provider>
    )
  }
}
