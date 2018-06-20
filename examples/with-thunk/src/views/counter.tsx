import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreST, Counter } from '../store'
import { CounterQR } from '../models/counter'
import * as CounterThunks from '../thunks/counter'

// ______________________________________________________
//
// @ Container

export const CounterContainer = connect(
  (s: StoreST) => ({
    name: s.counter.name,
    count: s.counter.count,
    expo2: CounterQR.expo2(s.counter),
    autoIncrementBtnLabel: CounterQR.getAutoIncrementBtnLabel(s.counter)
  }),
  {
    handleClickIncrement: Counter.creators.increment,
    handleClickDecrement: Counter.creators.decrement,
    handleClickAutoIncrement: CounterThunks.startAutoIncrement
  }
)(p =>
  <div>
    <h1>{p.name}</h1>
    <p>count = {p.count}</p>
    <p>expo2 = {p.expo2}</p>
    <button onClick={() => p.handleClickIncrement()}>increment</button>
    <button onClick={() => p.handleClickIncrement()}>decrement</button>
    <button onClick={() => p.handleClickAutoIncrement()}>
      {p.autoIncrementBtnLabel}
    </button>
  </div>
)
