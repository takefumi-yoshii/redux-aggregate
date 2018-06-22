import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StoreST, Counter1, Counter2, Counter3 } from '../store'
import { CounterQR, CounterST } from '../models/counter'
import { CounterComponent, MapState, MapDispatch } from './CounterComponent'

// ______________________________________________________
//
// @ Containers

const mapState = (s: CounterST): MapState => ({
  name: s.name,
  count: s.count,
  expo2: CounterQR.expo2(s),
  abc: s.a.b.c,
  styled: { bg: s.bgColor }
})

const mapDispatch = (creators = Counter1.creators) =>
  (dispatch: Dispatch<StoreST>): MapDispatch =>
    bindActionCreators({
      handleClickIncrement: creators.increment,
      handleClickDecrement: creators.decrement,
      handleClickNestedValue: creators.setNestedValue
    }, dispatch)

export const containerFactory = (
  selectState: (s: StoreST) => CounterST,
  creators = Counter1.creators // infered types
) =>
  connect(
    (store: StoreST) => mapState(selectState(store)),
    (dispatch: Dispatch<StoreST>) => mapDispatch(creators)(dispatch)
  )(props => <CounterComponent {...props} />)

const CT1 = containerFactory(s => s.counter1, Counter1.creators)
const CT2 = containerFactory(s => s.counter2, Counter2.creators)
const CT3 = containerFactory(s => s.counter3, Counter3.creators)

export default { CT1, CT2, CT3 }
