import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreST, Counter1, Counter2, Counter3 } from '../store'
import { CounterQR, CounterST } from '../models/counter'

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
  (s: StoreST) => mapState(s.counter1),
  {
    handleClickIncrement: Counter1.creators.increment,
    handleClickDecrement: Counter1.creators.decrement,
    handleClickNestedValue: Counter1.creators.setNestedValue
  }
)(props => <Component {...props} />)

export const CounterContainer2 = connect(
  (s: StoreST) => mapState(s.counter2),
  {
    handleClickIncrement: Counter2.creators.increment,
    handleClickDecrement: Counter2.creators.decrement,
    handleClickNestedValue: Counter2.creators.setNestedValue
  }
)(props => <Component {...props} />)

export const CounterContainer3 = connect(
  (s: StoreST) => mapState(s.counter3),
  {
    handleClickIncrement: Counter3.creators.increment,
    handleClickDecrement: Counter3.creators.decrement,
    handleClickNestedValue: Counter3.creators.setNestedValue
  }
)(props => <Component {...props} />)

// ______________________________________________________
//
// @ Components

const Component = (p: {
  name: string
  count: number
  expo2: number
  abc: string
  handleClickIncrement: () => any
  handleClickDecrement: () => any
  handleClickNestedValue: (value: string) => any
}) =>
  <div>
    <h1>{p.name}</h1>
    <p>count = {p.count}</p>
    <p>expo2 = {p.expo2}</p>
    <p>a.b.c = {p.abc}</p>
    <button onClick={() => p.handleClickIncrement()}>increment</button>
    <button onClick={() => p.handleClickDecrement()}>decrement</button>
    <button onClick={() => p.handleClickNestedValue('immutable change')}>setNestedValue</button>
  </div>
