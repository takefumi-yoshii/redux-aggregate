import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreState, Counter1, Counter2, Counter3 } from '../store'
import { P, Q, S } from '../models/counter'

// ______________________________________________________
//
// @ Components

interface Props {
  name: string
  count: number
  expo2: number
  abc: string
  increment: () => void
  decrement: () => void
  setNestedValue: (p: P['setNestedValue']) => void
}
export function Component({
  name,
  count,
  expo2,
  abc,
  increment,
  decrement,
  setNestedValue,
}: Props) {
  return (
    <div>
      <h1>{name}</h1>
      <p>count = {count}</p>
      <p>expo2 = {expo2}</p>
      <p>a.b.c = {abc}</p>
      <button onClick={() => increment()}>increment</button>
      <button onClick={() => decrement()}>decrement</button>
      <button onClick={() => setNestedValue('immutable change')}>setNestedValue</button>
    </div>
  )
}

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
