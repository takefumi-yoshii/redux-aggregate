import immer from 'immer'
import { Modeler } from 'redux-aggregate'
import { TodoModel, TodoST } from './todo'

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

const addTodo = (state: TodosST): TodosST =>
  immer(state, _state => {
    const value = TodosQR.getInputValue(_state)
    if (value === '') return
    _state.items.push(TodoModel({ value, date: new Date() }))
    _state.input = ''
  })
const setInputValue = (state: TodosST, value: string): TodosST =>
  immer(state, _state => {
    _state.input = value
  })
const setItemDone = (
  state: TodosST,
  { id, done }: { id: string; done: boolean }
): TodosST =>
  immer(state, _state => {
    const item = _state.items.find(item => item.id === id)
    if (item === undefined) return
    item.done = done
  })

export const TodosMT = {
  addTodo,
  setInputValue,
  setItemDone
}

// ______________________________________________________
//
// @ TodosModel Subscriptions

const Timer = {
  tick(state: TodosST, timeLabel: string): TodosST {
    return { ...state, now: timeLabel }
  }
}
export const TodosSB = {
  Timer
}
