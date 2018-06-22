import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StoreST, Counter } from '../store'
import { CounterQR, CounterST } from '../models/counter'
import * as CounterThunks from '../thunks/counter'
import CounterComponent, { MapState, MapDispatch } from './CounterComponent'

// ______________________________________________________
//
// @ Container

const mapState = (s: CounterST): MapState => ({
  name: s.name,
  count: s.count,
  expo2: CounterQR.expo2(s),
  autoIncrementBtnLabel: CounterQR.getAutoIncrementBtnLabel(s),
  styled: { bg: s.bgColor }
})

const mapDispatch = (dispatch: Dispatch<StoreST>): MapDispatch =>
  bindActionCreators({
    handleClickIncrement: Counter.creators.increment,
    handleClickDecrement: Counter.creators.decrement,
    handleClickAutoIncrement: CounterThunks.startAutoIncrement
  }, dispatch)

export const CounterContainer = connect(
  (store: StoreST) => mapState(store.counter),
  (dispatch: Dispatch<StoreST>) => mapDispatch(dispatch)
)(props => <CounterComponent {...props} />)
