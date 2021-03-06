import * as React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { StoreST } from '../store'
import { TodosContainer } from './TodosContainer'
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
          <TodosContainer />
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
