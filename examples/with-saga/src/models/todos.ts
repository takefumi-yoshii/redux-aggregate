import { Modeler } from 'redux-aggregate'
import { TodoST, TodoModel } from './todo'

// ______________________________________________________
//
// @ TodosModel State

export interface TodosST {
  name: string
  input: string | null
  items: TodoST[]
  now: string
  bgColor: string
}
export const TodosModel: Modeler<TodosST> = injects => ({
  name: '',
  input: null,
  items: [],
  now: '',
  bgColor: '#fff',
  ...injects
})

// ______________________________________________________
//
// @ TodosModel Queries

function getInputValue(state: TodosST): string {
  if (state.input === null) return ''
  return `${state.input}`
}
export const TodosQR = {
  getInputValue
}

// ______________________________________________________
//
// @ TodosModel Mutations

function addTodo(state: TodosST): TodosST {
  const value = TodosQR.getInputValue(state)
  if (value === '') return state
  const todo = TodoModel({ value })
  const items = [...state.items]
  items.push(todo)
  return { ...state, items, input: '' }
}
function setInputValue(state: TodosST, value: string): TodosST {
  return { ...state, input: value }
}
export const TodosMT = {
  addTodo,
  setInputValue
}

// ______________________________________________________
//
// @ TodosModel Subscribes

const Timer = {
  tick(state: TodosST, timeLabel: string): TodosST {
    return { ...state, now: timeLabel }
  }
}
export const TodosSB = {
  Timer
}
