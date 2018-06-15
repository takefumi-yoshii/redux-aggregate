## Topics of this Example

The example where `redux-thunk` can be used normally.
Extract `ActionCreators` from `Aggregate` and dispatch in thunk function.

```javascript
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
```

`getAutoIncrementBtnLabel` uses the entity of `autoIncrement` to get the label of the button.

```javascript
// ______________________________________________________
//
// @ State

export interface CounterST {
  name: string
  count: number
  autoIncrement: boolean
}
export const CounterST: CounterST = {
  name: '',
  count: 0,
  autoIncrement: false
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

Even if the internal state and business logic complicatedly, the ViewComponent will not be broken.
It is recommended to use it inside a container to raise the purity of the component.

```javascript
// ______________________________________________________
//
// @ Containers

export const CounterContainer = connect(
  (s: StoreST) => ({
    name: s.counter.name,
    count: s.counter.count,
    expo2: CounterQR.expo2(s.counter),
    autoIncrementBtnLabel: CounterQR.getAutoIncrementBtnLabel(s.counter)
  }),
  {
    ...Counter.creators,
    startAutoIncrement
  }
)(props => <Component {...props} />)
```