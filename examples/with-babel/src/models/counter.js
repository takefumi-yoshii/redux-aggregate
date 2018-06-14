// ______________________________________________________
//
// @ State

export const S = {
  name: '',
  count: 0,
  todoCount: 0
}

// ______________________________________________________
//
// @ Queries

function getCount(state) {
  return state.count
}
function expo2(state) {
  return state.count ** 2
}
function getCountSum(state) {
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

function increment(state) {
  return { ...state, count: state.count + 1 }
}
function decrement(state) {
  return { ...state, count: state.count - 1 }
}
function setTodoCount(state, todoCount) {
  return { ...state, todoCount }
}
export const M = {
  increment,
  decrement,
  setTodoCount
}
