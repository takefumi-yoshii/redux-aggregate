import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreState, Counter } from '../store'
import { CounterQR } from '../models/counter'

// ______________________________________________________
//
// @ Components

const Component = (p: {
  name: string
  count: number
  expo2: number
  countSum: number
  increment: () => void
  decrement: () => void
}) =>
  <div>
    <h1>{p.name}</h1>
    <p>count = {p.count}</p>
    <p>expo2 = {p.expo2}</p>
    <p>counter.count + todos.count = {p.countSum}</p>
    <button onClick={() => p.increment()}>increment</button>
    <button onClick={() => p.decrement()}>decrement</button>
  </div>

// ______________________________________________________
//
// @ Containers

export const CounterContainer = connect(
  (s: StoreState) => ({
    name: s.counter.name,
    count: s.counter.count,
    expo2: CounterQR.expo2(s.counter),
    countSum: s.counter.count + s.counter.todoCount
  }),
  { ...Counter.creators }
)(props => <Component {...props} />)
