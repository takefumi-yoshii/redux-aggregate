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
