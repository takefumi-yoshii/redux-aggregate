import { Modeler } from 'redux-aggregate'
import { uuid } from './uuid'

// ______________________________________________________
//
// @ State

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
// @ Queries

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
