// ______________________________________________________
//
// @ State

export interface CounterST {
  name: string
  count: number
  a: { b: { c: string } }
}
export const CounterST: CounterST = {
  name: '',
  count: 0,
  a: { b: { c: 'c' } }
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
export const CounterQR = {
  getCount,
  expo2
}

// ______________________________________________________
//
// @ Mutations

export interface CounterPL {
  setNestedValue: string
}
function increment(state: CounterST): CounterST {
  return { ...state, count: state.count + 1 }
}
function decrement(state: CounterST): CounterST {
  return { ...state, count: state.count - 1 }
}
function setNestedValue(state: CounterST, value: CounterPL['setNestedValue']): CounterST {
  return {
    ...state, a: {
      ...state.a, b: {
        ...state.a.b, c: value
      }
    }
  }
}
export const CounterMT = {
  increment,
  decrement,
  setNestedValue
}
