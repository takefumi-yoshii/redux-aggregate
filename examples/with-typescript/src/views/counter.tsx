import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreState, Counter1, Counter2, Counter3 } from '../store'
import { P, Q, S } from '../models/counter'

// ______________________________________________________
//
// @ Components

const Component = (props: {
  name: string
  count: number
  expo2: number
  abc: string
  increment: () => void
  decrement: () => void
  setNestedValue: (p: P['setNestedValue']) => void
}) =>
  <div>
    <h1>{props.name}</h1>
    <p>count = {props.count}</p>
    <p>expo2 = {props.expo2}</p>
    <p>a.b.c = {props.abc}</p>
    <button onClick={() => props.increment()}>increment</button>
    <button onClick={() => props.decrement()}>decrement</button>
    <button onClick={() => props.setNestedValue('immutable change')}>setNestedValue</button>
  </div>

// ______________________________________________________
//
// @ Containers

const mapState = (s: S) => ({
  name: s.name,
  count: s.count,
  expo2: Q.expo2(s),
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
