import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StoreST, Counter1, Counter2, Counter3 } from '../store'
import { CounterQR, CounterST } from '../models/counter'
import CounterComponent from './CounterComponent'

// ______________________________________________________
//
// @ Types

interface StateProps {
  name: string
  count: number
  expo2: number
  abc: string
  styled: { bg: string }
}
interface DispatchProps {
  handleClickIncrement: () => any
  handleClickDecrement: () => any
  handleClickNestedValue: (value: string) => any
}
interface OwnProps {}
export type MergeProps = StateProps & DispatchProps & OwnProps

// ______________________________________________________
//
// @ Containers

const containerFactory = (
  selectState: (s: StoreST) => CounterST,
  creators = Counter1.creators // infered types
) =>
  connect<StateProps, DispatchProps, OwnProps>(
    (store: StoreST) =>
      ((s: CounterST): StateProps => ({
        name: s.name,
        count: s.count,
        expo2: CounterQR.expo2(s),
        abc: s.a.b.c,
        styled: { bg: s.bgColor }
      }))(selectState(store)),
    (dispatch: Dispatch<StoreST>): DispatchProps =>
      bindActionCreators(
        {
          handleClickIncrement: creators.increment,
          handleClickDecrement: creators.decrement,
          handleClickNestedValue: creators.setNestedValue
        },
        dispatch
      )
  )(props => <CounterComponent {...props} />)

const CT1 = containerFactory(s => s.counter1, Counter1.creators)
const CT2 = containerFactory(s => s.counter2, Counter2.creators)
const CT3 = containerFactory(s => s.counter3, Counter3.creators)

export default { CT1, CT2, CT3 }
