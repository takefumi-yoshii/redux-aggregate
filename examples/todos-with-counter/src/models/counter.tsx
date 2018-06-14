// ______________________________________________________
//
// @ State

export interface S {
  name: string
  count: number
  todoCount: number
}
export const S: S = {
  name: '',
  count: 0,
  todoCount: 0
}

// ______________________________________________________
//
// @ Queries

function getCount(state: S): number {
  return state.count
}
function expo2(state: S): number {
  return state.count ** 2
}
function getCountSum(state: S): number {
  return state.count + state.todoCount
}
export const Q = {
  getCount,
  expo2,
  getCountSum
}

// ______________________________________________________
//
// @ Mutations

export interface P {
  setTodoCount: number
}
function increment(state: S): S {
  return { ...state, count: state.count + 1 }
}
function decrement(state: S): S {
  return { ...state, count: state.count - 1 }
}
function setTodoCount(state: S, todoCount: P['setTodoCount']): S {
  return { ...state, todoCount }
}
export const M = {
  increment,
  decrement,
  setTodoCount
}
