import { S as TodoS, Model as TodoModel } from './todo'

// ______________________________________________________
//
// @ TodosModel State

export interface S {
  name: string
  input: string | number
  items: TodoS[]
}
export const S: S = {
  name: '',
  input: null,
  items: []
}

// ______________________________________________________
//
// @ TodosModel Queries

function getInputValue(state: S): string {
  if (state.input === null) return ''
  return `${state.input}`
}
export const Q = {
  getInputValue
}

// ______________________________________________________
//
// @ TodosModel Mutations

export interface P {
  setInputValue: string | number
}
function addTodo(state: S): S {
  const value = Q.getInputValue(state)
  if (value === '') return
  const todo = TodoModel({ value, date: new Date() })
  const items = [...state.items]
  items.push(todo)
  return { ...state, items, input: '' }
}
function setInputValue(state: S, value: P['setInputValue']): S {
  return { ...state, input: value }
}
export const M = {
  addTodo,
  setInputValue
}
