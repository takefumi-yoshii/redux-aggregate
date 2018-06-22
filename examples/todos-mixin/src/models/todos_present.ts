import immer from 'immer'
import { Modeler } from 'redux-aggregate'
import { TodosST, TodosQR, TodosMT, TodosModel } from './todos'
import { TodoST } from './todo'

// ______________________________________________________
//
// @ State

export interface TodosPresentST extends TodosST {
  showAll: boolean
}
export const TodosPresentModel: Modeler<TodosPresentST> = injects => ({
  ...TodosModel(),
  showAll: true,
  ...injects
})

// ______________________________________________________
//
// @ Queries

function getDoingItems (state: TodosPresentST): TodoST[] {
  return state.items.filter(item => !item.done)
}
function getDoneItems (state: TodosPresentST): TodoST[] {
  return state.items.filter(item => item.done)
}
function getVisibleItems (state: TodosPresentST): TodoST[] {
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

const toggleShowAll = (
  state: TodosPresentST
): TodosPresentST => immer(state, _state => {
  _state.showAll = !_state.showAll
})
export const TodosPresentMT = {
  ...TodosMT,
  toggleShowAll
}
