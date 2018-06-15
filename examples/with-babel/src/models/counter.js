// ______________________________________________________
//
// @ State

export const S = {
  name: '',
  count: 0
}

// ______________________________________________________
//
// @ Queries

function expo2(state) {
  return state.count ** 2
}
export const Q = { expo2 }

// ______________________________________________________
//
// @ Mutations

function increment(state) {
  return { ...state, count: state.count + 1 }
}
function decrement(state) {
  return { ...state, count: state.count - 1 }
}
export const M = { increment, decrement }
