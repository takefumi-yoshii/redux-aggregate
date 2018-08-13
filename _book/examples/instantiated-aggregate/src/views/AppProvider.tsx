import * as React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { StoreST } from '../store'
import CounterContainer from './CounterContainer'
import styled from 'styled-components'

// ______________________________________________________

export class AppProvider extends React.Component<
  { store: Store<StoreST> },
  never
> {
  render() {
    return (
      <Provider store={this.props.store}>
        <StyledView>
          <CounterContainer.CT1 />
          <CounterContainer.CT2 />
          <CounterContainer.CT3 />
        </StyledView>
      </Provider>
    )
  }
}

const StyledView = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 10px;
  box-sizing: border-box;
`
