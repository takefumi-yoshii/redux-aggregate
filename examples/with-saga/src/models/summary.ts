import { Modeler } from 'redux-aggregate'

// ______________________________________________________
//
// @ SummaryModel State

export interface SummaryST {
  name: string
  counterCount: number
  todosCount: number
  now: string
  bgColor: string
}
export const SummaryModel: Modeler<SummaryST> = injects => ({
  name: '',
  counterCount: 0,
  todosCount: 0,
  now: '',
  bgColor: '#fff',
  ...injects
})

// ______________________________________________________
//
// @ SummaryModel Queries

function sum(state: SummaryST): number {
  return state.counterCount + state.todosCount
}
function sumLabel(state: SummaryST): string {
  return `counterCount + state.todosCount = ${sum(state)}`
}
export const SummaryQR = {
  sumLabel
}

// ______________________________________________________
//
// @ SummaryModel Subscribes

const Timer = {
  tick(state: SummaryST, timeLabel: string): SummaryST {
    return { ...state, now: timeLabel }
  }
}
const Todos = {
  addTodo(state: SummaryST): SummaryST {
    return { ...state, todosCount: state.todosCount + 1 }
  }
}
const Counter = {
  increment(state: SummaryST): SummaryST {
    return { ...state, counterCount: state.counterCount + 1 }
  },
  decrement(state: SummaryST): SummaryST {
    return { ...state, counterCount: state.counterCount - 1 }
  }
}
export const SummarySB = {
  Timer,
  Todos,
  Counter
}
