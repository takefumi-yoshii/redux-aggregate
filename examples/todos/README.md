## Topics of this Example

This example shows nesting of child model.
Nested state also has behavior.

```javascript
// ______________________________________________________
//
// @ TodoModel State

export interface S {
  value: string
  date: Date
}
export const S: S = {
  value: '',
  date: new Date()
}

// ______________________________________________________
//
// @ TodoModel Queries

function getDateLabel({ date }: S): string {
  const month = date.getMonth() + 1
  const _date = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${month}/${_date} ${hour}:${minute}:${second}`
}
export const Q = {
  getDateLabel
}

export const Model = (injects: S): S => ({ ...S, ...injects })

```

It is important to be able to dependencies inject when creating instances.
By manipulating this factory method you can get the behavior of an abstracted child model.

```javascript
import { Model as TodoModel } from './todo'

// ______________________________________________________
//
// @ TodosModel Mutations

function addTodo(state: S): S {
  const value = Q.getInputValue(state)
  if (value === '') return
  const todo = TodoModel({ value, date: new Date() })
  const items = [...state.items]
  items.push(todo)
  return { ...state, items, input: '' }
}
```