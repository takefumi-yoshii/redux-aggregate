import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreState, Counter } from '../store'
import { S, Q } from '../models/counter'
// ______________________________________________________

interface Props {
  name: string
  count: number
  expo2: number
  countSum: number
  increment: () => void
  decrement: () => void
}
export function Component({
  name,
  count,
  expo2,
  countSum,
  increment,
  decrement
}: Props) {
  return (
    <div>
      <h1>{name}</h1>
      <p>count = {count}</p>
      <p>expo2 = {expo2}</p>
      <p>counter.count + todos.count = {countSum}</p>
      <button onClick={() => increment()}>increment</button>
      <button onClick={() => decrement()}>decrement</button>
    </div>
  )
}

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
