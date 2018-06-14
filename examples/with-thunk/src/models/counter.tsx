// ______________________________________________________
//
// @ State

export interface S {
  name: string
  count: number
  autoIncrement: boolean
}
export const S: S = {
  name: '',
  count: 0,
  autoIncrement: false
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
function getAutoIncrementBtnLabel(state: S): string {
  return state.autoIncrement ? 'stop' : 'start'
}
export const Q = {
  getCount,
  expo2,
  getAutoIncrementBtnLabel
}

// ______________________________________________________
//
// @ Mutations

function increment(state: S): S {
  return { ...state, count: state.count + 1 }
}
function decrement(state: S): S {
  return { ...state, count: state.count - 1 }
}
function toggleAutoIncrement(state: S): S {
  return { ...state, autoIncrement: !state.autoIncrement }
}
export const M = {
  increment,
  decrement,
  toggleAutoIncrement
}
