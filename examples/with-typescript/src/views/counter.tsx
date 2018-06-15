import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreState, Counter1, Counter2, Counter3 } from '../store'
import { CounterPL, CounterQR, CounterST } from '../models/counter'

// ______________________________________________________
//
// @ Components

const Component = (p: {
  name: string
  count: number
  expo2: number
  abc: string
  increment: () => void
  decrement: () => void
  setNestedValue: (pl: CounterPL['setNestedValue']) => void
}) =>
  <div>
    <h1>{p.name}</h1>
    <p>count = {p.count}</p>
    <p>expo2 = {p.expo2}</p>
    <p>a.b.c = {p.abc}</p>
    <button onClick={() => p.increment()}>increment</button>
    <button onClick={() => p.decrement()}>decrement</button>
    <button onClick={() => p.setNestedValue('immutable change')}>setNestedValue</button>
  </div>

// ______________________________________________________
//
// @ Containers

const mapState = (s: CounterST) => ({
  name: s.name,
  count: s.count,
  expo2: CounterQR.expo2(s),
  abc: s.a.b.c
})
export const CounterContainer1 = connect(
  (s: StoreState) => mapState(s.counter1),
  { ...Counter1.creators }
)(props => <Component {...props} />)

export const CounterContainer2 = connect(
  (s: StoreState) => mapState(s.counter2),
  { ...Counter2.creators }
)(props => <Component {...props} />)

export const CounterContainer3 = connect(
  (s: StoreState) => mapState(s.counter3),
  { ...Counter3.creators }
)(props => <Component {...props} />)
