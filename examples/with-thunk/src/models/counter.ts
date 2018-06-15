// ______________________________________________________
//
// @ State

export interface CounterST {
  name: string
  count: number
  autoIncrement: boolean
}
export const CounterST: CounterST = {
  name: '',
  count: 0,
  autoIncrement: false
}

// ______________________________________________________
//
// @ Queries

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
// @ Mutations

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