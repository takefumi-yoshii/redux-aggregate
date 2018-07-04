import { connect } from 'preact-redux'
import { Counter } from '../store'
import { CounterQR } from '../models/counter'
import styled from 'styled-components'

// ______________________________________________________
//
// @ View

const View = ({ className, name, count, expo2, increment, decrement }) => (
  <div className={className}>
    <h1>{name}</h1>
    <p>count = {count}</p>
    <p>expo2 = {expo2}</p>
    <button onClick={() => increment()}>increment</button>
    <button onClick={() => decrement()}>decrement</button>
  </div>
)

// ______________________________________________________
//
// @ Component

const Component = styled(View)`
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

// ______________________________________________________
//
// @ Containers

export const CounterContainer = connect(
  s => ({
    name: s.counter.name,
    count: s.counter.count,
    expo2: CounterQR.expo2(s.counter),
    styled: { bg: s.counter.bgColor }
  }),
  { ...Counter.creators }
)(props => <Component {...props} />)
