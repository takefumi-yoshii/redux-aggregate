// ______________________________________________________
//
// @ State

export const CounterST = {
  name: '',
  count: 0,
  styled: { bg: '#fff' }
}

// ______________________________________________________
//
// @ Queries

function expo2(state) {
  return state.count ** 2
}
export const CounterQR = { expo2 }

// ______________________________________________________
//
// @ Mutations

function increment(state) {
  return { ...state, count: state.count + 1 }
}
function decrement(state) {
  return { ...state, count: state.count - 1 }
}
export const CounterMT = { increment, decrement }
