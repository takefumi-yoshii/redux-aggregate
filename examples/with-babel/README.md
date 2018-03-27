## Topics of this Example

This sample is the simplest configuration. Create a store instance with store.js.

```javascript
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAggregate, reduceAggregate } from 'redux-aggregate'
import { domain } from './models/counter'

function defineStore(reducer) {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}
export const counter = createAggregate('counter/', domain)
export const store = defineStore({
  counter: reduceAggregate(counter, { name: 'COUNTER' })
})
```

The Domain Object consists of state / computed / actions. Computed is optional, but by using it, it becomes possible to calculate the necessary value from the value to be held, and it will be effective in various situations.

```javascript
export const state = { count: 0 }
export const computed = {
  expo2() { return this.count ** 2 }
}
export const actions = {
  increment() { this.count++ },
  decrement() { this.count-- }
}
export const domain = { state, computed, actions }
```