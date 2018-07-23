import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { StoreST, Counter } from '../store'
import { CounterQR, CounterST } from '../models/counter'
import CounterComponent from './CounterComponent'

// ______________________________________________________
//
// @ Types

export type MapState = {
  name: string
  count: number
  expo2: number
  countSum: number
  styled: { bg: string }
}

export type MapDispatch = {
  handleClickIncrement: () => any
  handleClickDecrement: () => any
}

// ______________________________________________________
//
// @ Container

const mapState = (s: CounterST): MapState => ({
  name: s.name,
  count: s.count,
  expo2: CounterQR.expo2(s),
  countSum: s.count + s.todoCount,
  styled: { bg: s.bgColor }
})

const mapDispatch = (dispatch: Dispatch<AnyAction>): MapDispatch =>
  bindActionCreators(
    {
      handleClickIncrement: Counter.creators.increment,
      handleClickDecrement: Counter.creators.decrement
    },
    dispatch
  )

export const CounterContainer = connect(
  (store: StoreST) => mapState(store.counter),
  (dispatch: Dispatch<AnyAction>) => mapDispatch(dispatch)
)(props => <CounterComponent {...props} />)
