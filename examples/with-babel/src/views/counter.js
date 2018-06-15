import { connect } from 'preact-redux'
import { Counter } from '../store'
import { CounterQR } from '../models/counter'

// ______________________________________________________
//
// @ Components

const Component = ({
  name,
  count,
  expo2,
  increment,
  decrement
}) =>
  <div>
    <h1>{name}</h1>
    <p>count = {count}</p>
    <p>expo2 = {expo2}</p>
    <button onClick={() => increment()}>increment</button>
    <button onClick={() => decrement()}>decrement</button>
  </div>

// ______________________________________________________
//
// @ Containers

export const CounterContainer = connect(
  s => ({
    name: s.counter.name,
    count: s.counter.count,
    expo2: CounterQR.expo2(s.counter)
  }),
  { ...Counter.creators }
)(props => <Component {...props} />)
