import { counter } from '../store'

function wait () {
  return new Promise(resolve => {
    setTimeout(resolve, 100)
  })
}

export function toggleAutoIncrement () {
  return async (dispatch, getState) => {
    dispatch(counter.creators.toggleAutoIncrement())
    while (true) {
      await wait()
      const state = getState()
      const { autoIncrement, count } = state.counter
      if (!autoIncrement) break
      dispatch(counter.creators.increment())
    }
  }
}

