// ______________________________________________________
//
// @ TodoModel State

export interface TodoST {
  value: string
  date: Date
}
export const TodoST: TodoST = {
  value: '',
  date: new Date()
}

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
export const TodoModel = (injects: TodoST): TodoST => ({ ...TodoST, ...injects })
