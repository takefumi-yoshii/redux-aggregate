import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { Counter, StoreST } from '../store'
type ThunkAsyncReturn = ThunkAction<Promise<void>, StoreST, null, Action>

function wait() {
  return new Promise(resolve => {
    setTimeout(resolve, 100)
  })
}

export function startAutoIncrement(): ThunkAsyncReturn {
  const { toggleAutoIncrement, increment } = Counter.creators
  return async (dispatch, getState) => {
    dispatch(toggleAutoIncrement())
    while (true) {
      await wait()
      const { counter } = getState()
      if (!counter.autoIncrement) break
      dispatch(increment())
    }
  }
}
