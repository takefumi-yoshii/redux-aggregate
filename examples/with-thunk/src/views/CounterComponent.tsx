import * as React from 'react'
import styled from 'styled-components'

// ______________________________________________________
//
// @ View

export type MapState = {
  name: string
  count: number
  expo2: number
  autoIncrementBtnLabel: string
  styled: { bg: string }
}
export type MapDispatch = {
  handleClickIncrement: () => any
  handleClickDecrement: () => any
  handleClickAutoIncrement: () => any
}
type Props = MapState & MapDispatch & { className: string }

const View = (props: Props) => (
  <div className={props.className}>
    <h1>{props.name}</h1>
    <p>count = {props.count}</p>
    <p>expo2 = {props.expo2}</p>
    <button onClick={() => props.handleClickIncrement()}>increment</button>
    <button onClick={() => props.handleClickIncrement()}>decrement</button>
    <button onClick={() => props.handleClickAutoIncrement()}>
      {props.autoIncrementBtnLabel}
    </button>
  </div>
)

// ______________________________________________________
//
// @ StyledView

const StyledView = styled<Props, any>(View)`
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

export const CounterComponent = StyledView
