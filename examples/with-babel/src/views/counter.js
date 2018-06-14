import { connect } from 'preact-redux'
import { Counter } from '../store'
import { Q } from '../models/counter'

// ______________________________________________________

export function Component({
  name,
  count,
  expo2,
  countSum,
  increment,
  decrement
}) {
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
  s => ({
    name: s.counter.name,
    count: s.counter.count,
    expo2: Q.expo2(s.counter),
    countSum: s.counter.count + s.counter.todoCount
  }),
  { ...Counter.creators }
)(props => <Component {...props} />)
