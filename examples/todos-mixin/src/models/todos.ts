import { TodoModel } from './todo'

// ______________________________________________________
//
// @ State

export interface TodosST {
  name: string
  input: string | number
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

export interface TodosPL {
  setInputValue: string | number
  setItemDone: { id: string, done: boolean }
}
function addTodo(state: TodosST): TodosST {
  const value = TodosQR.getInputValue(state)
  if (value === '') return
  const todo = TodoModel({ value, date: new Date() })
  const items = [...state.items]
  items.push(todo)
  return { ...state, items, input: '' }
}
function setInputValue(
  state: TodosST,
  value: TodosPL['setInputValue']
): TodosST {
  return { ...state, input: value }
}
function setItemDone(
  state: TodosST,
  { id, done }: TodosPL['setItemDone']
): TodosST {
  return { ...state, items: [...state.items].map(item => {
    return item.id === id ? { ...item, done } : item
    })
  }
}
export const TodosMT = {
  addTodo,
  setInputValue,
  setItemDone
}
