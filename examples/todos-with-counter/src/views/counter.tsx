import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreState, Counter } from '../store'
import { Q } from '../models/counter'
// ______________________________________________________

const Component = (props: {
  name: string
  count: number
  expo2: number
  countSum: number
  increment: () => void
  decrement: () => void
}) =>
  <div>
    <h1>{props.name}</h1>
    <p>count = {props.count}</p>
    <p>expo2 = {props.expo2}</p>
    <p>counter.count + todos.count = {props.countSum}</p>
    <button onClick={() => props.increment()}>increment</button>
    <button onClick={() => props.decrement()}>decrement</button>
  </div>

// ______________________________________________________
//
// @ Containers

export const CounterContainer = connect(
  (s: StoreState) => ({
    name: s.counter.name,
    count: s.counter.count,
    expo2: Q.expo2(s.counter),
    countSum: s.counter.count + s.counter.todoCount
  }),
  { ...Counter.creators }
)(props => <Component {...props} />)
