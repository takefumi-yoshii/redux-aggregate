import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { StoreST, Counter } from '../store'
import { CounterQR, CounterST } from '../models/counter'
import * as CounterThunks from '../thunks/counter'
import CounterComponent from './CounterComponent'

// ______________________________________________________
//
// @ Types

export type MapState = {
  name: string
  count: number
  expo2: number
  autoIncrementBtnLabel: string
  timeLabel: string
  styled: { bg: string }
}

export type MapDispatch = {
  handleClickIncrement: () => any
  handleClickDecrement: () => any
  handleClickAutoIncrement: () => any
}

// ______________________________________________________
//
// @ Container

const mapState = (s: CounterST): MapState => ({
  name: s.name,
  count: s.count,
  expo2: CounterQR.expo2(s),
  autoIncrementBtnLabel: CounterQR.getAutoIncrementBtnLabel(s),
  timeLabel: s.now,
  styled: { bg: s.bgColor }
})

const mapDispatch = (dispatch: Dispatch<AnyAction>): MapDispatch =>
  bindActionCreators(
    {
      handleClickIncrement: Counter.creators.increment,
      handleClickDecrement: Counter.creators.decrement,
      handleClickAutoIncrement: CounterThunks.startAutoIncrement
    },
    dispatch
  )

export const CounterContainer = connect(
  (store: StoreST) => mapState(store.counter),
  (dispatch: Dispatch<AnyAction>) => mapDispatch(dispatch)
)(CounterComponent)
