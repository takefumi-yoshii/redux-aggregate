import * as React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { StoreST } from '../store'
import { CounterContainer1, CounterContainer2, CounterContainer3 } from './counter'

// ______________________________________________________

const View = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 10px;
  box-sizing: border-box;
`
class RootView extends React.Component<{}, never> {
  render () {
    return (
      <View>
        <CounterContainer1 />
        <CounterContainer2 />
        <CounterContainer3 />
      </View>
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
