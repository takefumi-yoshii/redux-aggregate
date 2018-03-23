## Topics of this Example

The example where `redux-thunk` can be used normally.
Extract `ActionCreators` from `Aggregate` and dispatch in thunk function.

```javascript
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
```

Computed uses the entity of `autoIncrement` to get the label of the button.

```javascript
export const state: state = {
  name: '',
  count: 0,
  autoIncrement: false
}

export const computed: This & computed = {
  getCount(): number {
    return this.count
  },
  expo2(): number {
    return this.count ** 2
  },
  getAutoIncrementBtnLabel(): string {
    return this.autoIncrement ? 'stop' : 'start'
  }
}

export const actions: This & actions = {
  increment(): void {
    this.count++
  },
  decrement(): void {
    this.count--
  },
  toggleAutoIncrement(): void {
    this.autoIncrement = !this.autoIncrement
  }
}
```

Even if the internal state and business logic complicatedly, the ViewComponent will not be broken.
It can be called from anywhere as long as the state tree can be referenced.

```javascript
interface CounterComponentProps extends creators {
  model: Model
}
export function CounterComponent({
  model,
  increment,
  decrement,
  toggleAutoIncrement
}: CounterComponentProps) {
  return (
    <div>
      <h1>{model.name}</h1>
      <p>count = {model.count}</p>
      <p>expo2 = {model.expo2()}</p>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={() => toggleAutoIncrement()}>
        {model.getAutoIncrementBtnLabel()}
      </button>
    </div>
  )
}
```