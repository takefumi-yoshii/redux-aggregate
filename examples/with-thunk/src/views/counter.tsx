import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreState, Counter } from '../store'
import { Q } from '../models/counter'
import { startAutoIncrement } from '../thunks/counter'
// ______________________________________________________

interface Props {
  name: string
  count: number
  expo2: number
  autoIncrementBtnLabel: string
  increment: () => void
  decrement: () => void
  startAutoIncrement: () => void
}
export function Component({
  name,
  count,
  expo2,
  autoIncrementBtnLabel,
  increment,
  decrement,
  startAutoIncrement
}: Props) {
  return (
    <div>
      <h1>{name}</h1>
      <p>count = {count}</p>
      <p>expo2 = {expo2}</p>
      <button onClick={() => increment()}>increment</button>
      <button onClick={() => decrement()}>decrement</button>
      <button onClick={() => startAutoIncrement()}>
        {autoIncrementBtnLabel}
      </button>
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
    autoIncrementBtnLabel: Q.getAutoIncrementBtnLabel(s.counter)
  }),
  {
    ...Counter.creators,
    startAutoIncrement
  }
)(props => <Component {...props} />)
