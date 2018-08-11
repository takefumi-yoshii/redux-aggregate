import { Modeler } from 'redux-aggregate'

// ______________________________________________________
//
// @ CounterModel State

export interface CounterST {
  name: string
  count: number
  todoCount: number
  now: string
  bgColor: string
}
export const CounterModel: Modeler<CounterST> = injects => ({
  name: '',
  count: 0,
  todoCount: 0,
  now: '',
  bgColor: '#fff',
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
function getCountSum(state: CounterST): number {
  return state.count + state.todoCount
}
export const CounterQR = {
  getCount,
  expo2,
  getCountSum
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
function setTodoCount(state: CounterST, todoCount: number): CounterST {
  return { ...state, todoCount }
}
export const CounterMT = {
  increment,
  decrement,
  setTodoCount
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
