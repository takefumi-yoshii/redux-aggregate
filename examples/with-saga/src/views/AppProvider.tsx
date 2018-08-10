import * as React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { StoreST } from '../store'
import { CounterContainer } from './CounterContainer'
import { TodosContainer } from './TodosContainer'
import { SummaryContainer } from './SummaryContainer'
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
          <CounterContainer />
          <TodosContainer />
          <SummaryContainer />
        </StyledView>
      </Provider>
    )
  }
}

const StyledView = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
`
