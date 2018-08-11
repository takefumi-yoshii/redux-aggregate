import { Modeler } from 'redux-aggregate'

// ______________________________________________________
//
// @ Model

export interface CounterST {
  name: string
  count: number
  bgColor: string
  now: string
  autoIncrement: boolean
}
export const CounterModel: Modeler<CounterST> = injects => ({
  name: '',
  count: 0,
  bgColor: '#fff',
  now: '',
  autoIncrement: false,
  ...injects
})

// ______________________________________________________
//
// @ CounterModel Queries

function getCount(state: CounterST): number {
  return state.count
}
function expo2(state: CounterST): number {
  return state.count ** 2
}
function getAutoIncrementBtnLabel(state: CounterST): string {
  return state.autoIncrement ? 'stop' : 'start'
}
export const CounterQR = {
  getCount,
  expo2,
  getAutoIncrementBtnLabel
}

// ______________________________________________________
//
// @ CounterModel Mutations

function increment(state: CounterST): CounterST {
  return { ...state, count: state.count + 1 }
}
function decrement(state: CounterST): CounterST {
  return { ...state, count: state.count - 1 }
}
function toggleAutoIncrement(state: CounterST): CounterST {
  return { ...state, autoIncrement: !state.autoIncrement }
}
export const CounterMT = {
  increment,
  decrement,
  toggleAutoIncrement
}

// ______________________________________________________
//
// @ CounterModel Subscriptions

const Timer = {
  tick(state: CounterST, timeLabel: string): CounterST {
    return { ...state, now: timeLabel }
  }
}
export const CounterSB = {
  Timer
}
