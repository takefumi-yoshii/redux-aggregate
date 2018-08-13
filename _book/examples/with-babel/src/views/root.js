import { Component } from 'preact'
import { Store } from 'redux'
import { Provider } from 'preact-redux'
import { CounterContainer } from './counter'
import styled from 'styled-components'

// ______________________________________________________

export class AppProvider extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <StyledView>
          <CounterContainer />
        </StyledView>
      </Provider>
    )
  }
}

const StyledView = styled.div`
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
`
