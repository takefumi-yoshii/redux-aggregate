## Topics of this Example

This example shows nesting of child model.
Nested state also has behavior.

```javascript
// ______________________________________________________
//
// @ TodoModel

export interface TodoST {
  id: string
  date: Date
  value: string
  done: boolean
}
export const TodoModel: Modeler<TodoST> = injects => ({
  id: uuid(),
  date: new Date(),
  value: '',
  done: false,
  ...injects
})

// ______________________________________________________
//
// @ TodoModel Queries

function getDateLabel({ date }: TodoST): string {
  const month = date.getMonth() + 1
  const _date = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${month}/${_date} ${hour}:${minute}:${second}`
}
export const TodoQR = {
  getDateLabel
}

```

It is important to be able to dependencies inject when creating instances.
By manipulating this factory method you can get the behavior of an abstracted child model.

```javascript
import { TodoModel, TodoST } from './todo'

// ______________________________________________________
//
// @ TodosModel Mutations

function addTodo(state: TodosST): TodosST {
  const value = TodosQR.getInputValue(state)
  if (value === '') return state
  const items = [...state.items, TodoModel({ value })]
  return { ...state, items, input: '' }
}
```
