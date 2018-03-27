import { counter } from '../store'

function wait () {
  return new Promise(resolve => {
    setTimeout(resolve, 100)
  })
}

export function toggleAutoIncrement () {
  const { toggleAutoIncrement, increment } = counter.creators
  return async (dispatch, getState) => {
    dispatch(toggleAutoIncrement())
    while (true) {
      await wait()
      const { autoIncrement } = getState().counter
      if (!autoIncrement) break
      dispatch(increment())
    }
  }
}

