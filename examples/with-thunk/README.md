## Topics of this Example

The example where `redux-thunk` can be used normally.
Extract `ActionCreators` from `Aggregate` and dispatch in thunk function.

```javascript
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { Counter, StoreST } from '../store'
type ThunkAsyncReturn = ThunkAction<Promise<void>, StoreST, null, Action>

function wait () {
  return new Promise(resolve => {
    setTimeout(resolve, 100)
  })
}

export function startAutoIncrement (): ThunkAsyncReturn {
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

```

`getAutoIncrementBtnLabel` uses the entity of `autoIncrement` to get the label of the button.
In the chain of Queries function, you can calculate complex states.

```javascript
// ______________________________________________________
//
// @ Model

export interface CounterST {
  name: string
  count: number
  bgColor: string
  autoIncrement: boolean
}
export const CounterModel: Modeler<CounterST> = injects => ({
  name: '',
  count: 0,
  bgColor: '#fff',
  autoIncrement: false,
  ...injects
})

// ______________________________________________________
//
// @ Queries

function getCount(state: CounterST): number {
  return state.count
}
function expo2(state: CounterST): number {
  return state.count ** 2
}
function getAutoIncrementBtnLabel(state: CounterST): string {
  return state.autoIncrement ? 'stop' : 'start'
}
export const CounterQR = {
  getCount,
  expo2,
  getAutoIncrementBtnLabel
}

// ______________________________________________________
//
// @ Mutations

function increment(state: CounterST): CounterST {
  return { ...state, count: state.count + 1 }
}
function decrement(state: CounterST): CounterST {
  return { ...state, count: state.count - 1 }
}
function toggleAutoIncrement(state: CounterST): CounterST {
  return { ...state, autoIncrement: !state.autoIncrement }
}
export const CounterMT = {
  increment,
  decrement,
  toggleAutoIncrement
}
```

Even if the internal state and business logic become complicated, ViewComponent will not broken.
it is the place where `CounterQR` is applicable.
It is recommended to use it inside a container to raise the purity of the component.

```javascript
// ______________________________________________________
//
// @ Container

const mapState = (s: CounterST): MapState => ({
  name: s.name,
  count: s.count,
  expo2: CounterQR.expo2(s),
  autoIncrementBtnLabel: CounterQR.getAutoIncrementBtnLabel(s),
  styled: { bg: s.bgColor }
})

const mapDispatch = (dispatch: Dispatch<StoreST>): MapDispatch =>
  bindActionCreators({
    handleClickIncrement: Counter.creators.increment,
    handleClickDecrement: Counter.creators.decrement,
    handleClickAutoIncrement: CounterThunks.startAutoIncrement
  }, dispatch)

export const CounterContainer = connect(
  (store: StoreST) => mapState(store.counter),
  (dispatch: Dispatch<StoreST>) => mapDispatch(dispatch)
)(props => <CounterComponent {...props} />)

```
