// ______________________________________________________
//
// @ State

export interface CounterST {
  name: string
  count: number
  todoCount: number
}
export const CounterST: CounterST = {
  name: '',
  count: 0,
  todoCount: 0
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
// @ Mutations

export interface CounterPL {
  setTodoCount: number
}
function increment(state: CounterST): CounterST {
  return { ...state, count: state.count + 1 }
}
function decrement(state: CounterST): CounterST {
  return { ...state, count: state.count - 1 }
}
function setTodoCount(state: CounterST, todoCount: CounterPL['setTodoCount']): CounterST {
  return { ...state, todoCount }
}
export const CounterMT = {
  increment,
  decrement,
  setTodoCount
}
