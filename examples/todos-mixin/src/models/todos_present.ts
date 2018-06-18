import immer from 'immer'
import { TodosST, TodosQR, TodosPL, TodosMT } from './todos'
import { TodoModel } from './todo'

// ______________________________________________________
//
// @ State

export interface TodosPresentST extends TodosST {
  showAll: boolean
}
export const TodosPresentST: TodosPresentST = {
  ...TodosST,
  showAll: true
}

// ______________________________________________________
//
// @ Queries

function getDoingItems (state: TodosPresentST): TodoModel[] {
  return state.items.filter(item => !item.done)
}
function getDoneItems (state: TodosPresentST): TodoModel[] {
  return state.items.filter(item => item.done)
}
function getVisibleItems (state: TodosPresentST): TodoModel[] {
  return state.showAll ? state.items : getDoingItems(state)
}
function getTodosCountStatusLabel (state: TodosPresentST): string {
  const all = `all: ${state.items.length}`
  const doing = `doing: ${getDoingItems(state).length}`
  const done = `done: ${getDoneItems(state).length}`
  return `${all} / ${doing} / ${done}`
}
function getToggleVisibleItemsBtnLabel (state: TodosPresentST): string {
  return state.showAll ? 'hide done items' : 'show all items'
}
export const TodosPresentQR = {
  ...TodosQR,
  getVisibleItems,
  getTodosCountStatusLabel,
  getToggleVisibleItemsBtnLabel
}

// ______________________________________________________
//
// @ Mutations

export interface TodosPresentPL extends TodosPL {
}
const toggleShowAll = (
  state: TodosPresentST
): TodosPresentST => immer(state, _state => {
  _state.showAll = !_state.showAll
})
export const TodosPresentMT = {
  ...TodosMT,
  toggleShowAll
}
