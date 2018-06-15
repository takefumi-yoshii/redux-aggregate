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

export interface S {
  name: string
  count: number
  autoIncrement: boolean
}
export const S: S = {
  name: '',
  count: 0,
  autoIncrement: false
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
function getAutoIncrementBtnLabel(state: S): string {
  return state.autoIncrement ? 'stop' : 'start'
}
export const Q = {
  getCount,
  expo2,
  getAutoIncrementBtnLabel
}

// ______________________________________________________
//
// @ Mutations

function increment(state: S): S {
  return { ...state, count: state.count + 1 }
}
function decrement(state: S): S {
  return { ...state, count: state.count - 1 }
}
function toggleAutoIncrement(state: S): S {
  return { ...state, autoIncrement: !state.autoIncrement }
}
export const M = {
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
  (s: StoreState) => ({
    name: s.counter.name,
    count: s.counter.count,
    expo2: Q.expo2(s.counter),
    autoIncrementBtnLabel: Q.getAutoIncrementBtnLabel(s.counter)
  }),
  {
    ...Counter.creators,
    startAutoIncrement
  }
)(props => <Component {...props} />)
```