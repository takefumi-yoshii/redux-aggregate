import * as React from 'react'
import { connect } from 'react-redux'
import { StoreST, Counter1, Counter2, Counter3 } from '../store'
import { CounterQR, CounterST } from '../models/counter'
import { CounterComponent } from './CounterComponent'

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
)(props => <CounterComponent {...props} />)

export const CounterContainer2 = connect(
  (s: StoreST) => mapState(s.counter2),
  {
    handleClickIncrement: Counter2.creators.increment,
    handleClickDecrement: Counter2.creators.decrement,
    handleClickNestedValue: Counter2.creators.setNestedValue
  }
)(props => <CounterComponent {...props} />)

export const CounterContainer3 = connect(
  (s: StoreST) => mapState(s.counter3),
  {
    handleClickIncrement: Counter3.creators.increment,
    handleClickDecrement: Counter3.creators.decrement,
    handleClickNestedValue: Counter3.creators.setNestedValue
  }
)(props => <CounterComponent {...props} />)
