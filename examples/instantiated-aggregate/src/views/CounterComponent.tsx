import * as React from 'react'
import styled from 'styled-components'
import { MergeProps } from './CounterContainer'

// ______________________________________________________
//
// @ Types

type Props = MergeProps & { className?: string }

// ______________________________________________________
//
// @ View

const View = (props: Props) => (
  <div className={props.className}>
    <h1>{props.name}</h1>
    <p>count = {props.count}</p>
    <p>expo2 = {props.expo2}</p>
    <p>a.b.c = {props.abc}</p>
    <button onClick={() => props.handleClickIncrement()}>increment</button>
    <button onClick={() => props.handleClickDecrement()}>decrement</button>
    <button onClick={() => props.handleClickNestedValue('immutable change')}>
      setNestedValue
    </button>
  </div>
)

// ______________________________________________________
//
// @ StyledView

export default styled(View)`
  flex: 1 0 auto;
  margin: 10px 20px;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid;
  background-color: ${props => props.styled.bg};
  > h1 {
    margin-bottom: 10px;
    font-size: 2rem;
    font-weight: bolder;
  }
  > p {
    margin-bottom: 10px;
  }
`
