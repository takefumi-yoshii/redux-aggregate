// ______________________________________________________
//
// @ State

export interface S {
  name: string
  count: number
  a: { b: { c: string } }
}
export const S: S = {
  name: '',
  count: 0,
  a: { b: { c: 'c' } }
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
export const Q = {
  getCount,
  expo2
}

// ______________________________________________________
//
// @ Mutations

export interface P {
  setNestedValue: string
}
function increment(state: S): S {
  return { ...state, count: state.count + 1 }
}
function decrement(state: S): S {
  return { ...state, count: state.count - 1 }
}
function setNestedValue(state: S, value: P['setNestedValue']): S {
  return {
    ...state, a: {
      ...state.a, b: {
        ...state.a.b, c: value
      }
    }
  }
}
export const M = {
  increment,
  decrement,
  setNestedValue
}
