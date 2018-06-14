import { Counter } from '../store'

function wait () {
  return new Promise(resolve => {
    setTimeout(resolve, 100)
  })
}

export function startAutoIncrement () {
  const { toggleAutoIncrement, increment } = Counter.creators
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
