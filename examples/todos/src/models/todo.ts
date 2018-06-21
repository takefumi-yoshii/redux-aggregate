import { uuid } from './uuid'

// ______________________________________________________
//
// @ TodoModel State

type Injects<T> = { [P in keyof T]?: T[P] }
export interface TodoST {
  id: string
  date: Date
  value: string
  done: boolean
}
export const TodoST = (): TodoST => ({
  id: uuid(),
  date: new Date(),
  value: '',
  done: false
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
export interface TodoModel extends TodoST {}
export const TodoModel = (injects: Injects<TodoST>): TodoST => ({ ...TodoST(), ...injects })
