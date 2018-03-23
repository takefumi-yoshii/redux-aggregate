## Topics of this Example

This example shows nesting of child model.
Nested state also has behavior.

```javascript
// ______________________________________________________
//
// @ types

export interface state {
  value: string
  date: Date
}
export interface computed {
  getDateLabel(): string
}
export interface Model extends state, computed {}
type This = ThisType<Model>

// ______________________________________________________
//
// @ Domain

export const state: state = {
  value: '',
  date: new Date()
}

export const computed: This & computed = {
  getDateLabel(): string {
    const month = this.date.getMonth() + 1
    const date = this.date.getDate()
    const hour = this.date.getHours()
    const minute = this.date.getMinutes()
    const second = this.date.getSeconds()
    return `${month}/${date} ${hour}:${minute}:${second}`
  }
}

export const Model = injects => ({ ...state, ...injects, ...computed })

```

It is important to be able to dependencies inject when creating instances.
By manipulating this factory method you can get the behavior of an abstracted child model.

```javascript
import { Model as TodoModel } from './todo'

export const actions: This & actions = {
  addTodo(): void {
    if (this.input === null) return
    const todo = TodoModel({ value: this.input, date: new Date() })
    this.todos.push(todo)
    this.input = ''
  },
  setInputValue(value: string | number): void {
    this.input = value
  }
}
```