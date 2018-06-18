import immer from 'immer'
import { TodoModel } from './todo'

// ______________________________________________________
//
// @ State

export interface TodosST {
  name: string
  input: string
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
  setInputValue: string
  setItemDone: { id: string, done: boolean }
}
const addTodo = (
  state: TodosST
): TodosST => immer(state, _state => {
  const value = TodosQR.getInputValue(_state)
  if (value === '') return
  _state.items.push(TodoModel({ value, date: new Date() }))
  _state.input = ''
})
const setInputValue = (
  state: TodosST,
  value: TodosPL['setInputValue']
): TodosST => immer(state, _state => {
  _state.input = value
})
const setItemDone = (
  state: TodosST,
  { id, done }: TodosPL['setItemDone']
): TodosST => immer(state, _state => {
  const item = _state.items.find(item => item.id === id)
  item.done = done
})

export const TodosMT = {
  addTodo,
  setInputValue,
  setItemDone
}
