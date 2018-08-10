import * as React from 'react'
import { connect } from 'react-redux'
import { StoreST, Summary } from '../store'
import { SummaryST, SummaryQR } from '../models/summary'
import { TodoST } from '../models/todo'
import SummaryComponent from './SummaryComponent'

// ______________________________________________________
//
// @ Types

export type MapState = {
  name: string
  counterCount: number
  todosCount: number
  sumLabel: string
  timeLabel: string
  styled: { bg: string }
}

// ______________________________________________________
//
// @ Container

const mapState = (s: SummaryST): MapState => ({
  name: s.name,
  counterCount: s.counterCount,
  todosCount: s.counterCount,
  sumLabel: SummaryQR.sumLabel(s),
  timeLabel: s.now,
  styled: { bg: s.bgColor }
})

export const SummaryContainer = connect((store: StoreST) =>
  mapState(store.summary)
)(props => <SummaryComponent {...props} />)
