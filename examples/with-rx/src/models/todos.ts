import { TodoModel } from './todo'

// ______________________________________________________
//
// @ State

export interface TodosST {
  name: string
  input: string | null
  items: TodoModel[]
}
export const TodosST: TodosST = {
  name: '',
  input: null,
  items: []
}

// ______________________________________________________
//
// @ Queries

function getInputValue(state: TodosST): string {
  if (state.input === null) return ''
  return `${state.input}`
}
export const TodosQR = {
  getInputValue
}

// ______________________________________________________
//
// @ Mutations

function addTodo(state: TodosST): TodosST {
  const value = TodosQR.getInputValue(state)
  if (value === '') return state
  const todo = TodoModel({ value, date: new Date() })
  const items = [...state.items]
  items.push(todo)
  return { ...state, items, input: '' }
}
function setInputValue(state: TodosST, value: string | null): TodosST {
  return { ...state, input: value }
}
export const TodosMT = {
  addTodo,
  setInputValue
}
