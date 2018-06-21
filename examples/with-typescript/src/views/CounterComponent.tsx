import * as React from 'react'
import styled from 'styled-components'

// ______________________________________________________
//
// @ Component

export const CounterComponent = (p: {
  name: string
  count: number
  expo2: number
  abc: string
  handleClickIncrement: () => any
  handleClickDecrement: () => any
  handleClickNestedValue: (value: string) => any
}) =>
  <CounterView>
    <h1>{p.name}</h1>
    <p>count = {p.count}</p>
    <p>expo2 = {p.expo2}</p>
    <p>a.b.c = {p.abc}</p>
    <button onClick={() => p.handleClickIncrement()}>increment</button>
    <button onClick={() => p.handleClickDecrement()}>decrement</button>
    <button onClick={() => p.handleClickNestedValue('immutable change')}>setNestedValue</button>
  </CounterView>

// ______________________________________________________
//
// @ View

const CounterView = styled.div`
  flex: 1 0 auto;
  margin: 10px 20px;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid;
  > h1 {
    margin-bottom: 10px;
    font-size: 2rem;
    font-weight: bolder;
  }
  > p {
    margin-bottom: 10px;
  }
`
