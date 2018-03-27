## Topics of this Example

In this example, static typing with TypeScript is shown.
It can infer the `state / calculation` using `ThisType`.

```javascript
// ______________________________________________________
//
// @ types

export interface state {
  name?: string
  count?: number
  a?: { b?: { c?: string | number } }
}
export interface computed {
  getCount(): number
  expo2(): number
}
export interface actions {
  increment?(): void
  decrement?(): void
  setNestedValue?(name: string): void
}
export interface Model extends state, computed {}
export interface creators extends actions {}
type This = ThisType<Model>

// ______________________________________________________
//
// @ Counter Domain

export const state: state = {
  name: '',
  count: 0,
  a: { b: { c: 'c' } }
}

export const computed: This & computed = {
  getCount(): number {
    return this.count
  },
  expo2(): number {
    return this.count ** 2
  }
}

export const actions: This & actions = {
  increment(): void {
    this.count++
  },
  decrement(): void {
    this.count--
  },
  setNestedValue(value: string): void {
    this.a.b.c = value
  }
}
```

Create different instances with same aggregate.
Even if the definition files are the same, it change the target state as another action by changing the specified namespace.

```javascript
import { createAggregate, reduceAggregate } from 'redux-aggregate'
import { domain } from './models/counter'
import { Model as CounterModel } from './models/counter'
import { Store as ReduxStore } from 'redux'

export interface AggregateRoot {
  counter1?: CounterModel
  counter2?: CounterModel
  counter3?: CounterModel
}
export interface Store extends ReduxStore<AggregateRoot> {}
export const counter1 = createAggregate('counter1/', domain)
export const counter2 = createAggregate('counter2/', domain)
export const counter3 = createAggregate('counter3/', domain)

export const Store = defineStore({
  counter1: reduceAggregate(counter1, { name: 'COUNTER1', count: 0 }),
  counter2: reduceAggregate(counter2, { name: 'COUNTER2', count: 10 }),
  counter3: reduceAggregate(counter3, { name: 'COUNTER3', count: 100 })
})
```