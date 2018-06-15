import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreState, Counter } from '../store'
import { CounterQR } from '../models/counter'
import { startAutoIncrement } from '../thunks/counter'
// ______________________________________________________

const Component = (p: {
  name: string
  count: number
  expo2: number
  autoIncrementBtnLabel: string
  increment: () => void
  decrement: () => void
  startAutoIncrement: () => void
}) =>
  <div>
    <h1>{p.name}</h1>
    <p>count = {p.count}</p>
    <p>expo2 = {p.expo2}</p>
    <button onClick={() => p.increment()}>increment</button>
    <button onClick={() => p.decrement()}>decrement</button>
    <button onClick={() => p.startAutoIncrement()}>
      {p.autoIncrementBtnLabel}
    </button>
  </div>

// ______________________________________________________
//
// @ Containers

export const CounterContainer = connect(
  (s: StoreState) => ({
    name: s.counter.name,
    count: s.counter.count,
    expo2: CounterQR.expo2(s.counter),
    autoIncrementBtnLabel: CounterQR.getAutoIncrementBtnLabel(s.counter)
  }),
  {
    ...Counter.creators,
    startAutoIncrement
  }
)(props => <Component {...props} />)
