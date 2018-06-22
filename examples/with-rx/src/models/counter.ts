// ______________________________________________________
//
// @ State

export interface CounterST {
  name: string
  count: number
  todoCount: number
  bgColor: string
}
export const CounterST: CounterST = {
  name: '',
  count: 0,
  todoCount: 0,
  bgColor: '#fff'
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
