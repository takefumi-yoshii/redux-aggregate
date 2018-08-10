import { Modeler } from 'redux-aggregate'

// ______________________________________________________
//
// @ CounterModel State

export interface CounterST {
  name: string
  count: number
  bgColor: string
  now: string
  a: { b: { c: string } }
}
export const CounterModel: Modeler<CounterST> = injects => ({
  name: '',
  count: 0,
  bgColor: '#fff',
  now: '',
  a: { b: { c: 'c' } },
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
export const CounterQR = {
  getCount,
  expo2
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
function setNestedValue(state: CounterST, value: string): CounterST {
  return {
    ...state,
    a: {
      ...state.a,
      b: {
        ...state.a.b,
        c: value
      }
    }
  }
}
export const CounterMT = {
  increment,
  decrement,
  setNestedValue
}

// ______________________________________________________
//
// @ CounterModel Subscribes

const Timer = {
  tick(state: CounterST, timeLabel: string): CounterST {
    return { ...state, now: timeLabel }
  }
}
export const CounterSB = {
  Timer
}
