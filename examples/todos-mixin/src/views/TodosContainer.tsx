import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { StoreST, Todos } from '../store'
import { TodosPresentQR, TodosPresentST } from '../models/todos_present'
import { TodoST } from '../models/todo'
import TodosComponent from './TodosComponent'

// ______________________________________________________
//
// @ Types

export type MapState = {
  name: string
  items: TodoST[]
  inputValue: string
  todosCountStatusLabel: string
  toggleVisibleItemsBtnLabel: string
  styled: { bg: string }
}

export type MapDispatch = {
  handleClickToggle: () => any
  handleSubmit: () => any
  handleInputChange: (payload: string) => any
  handleClickDone: (payload: { id: string; done: boolean }) => any
}

// ______________________________________________________
//
// @ Container

const mapState = (s: TodosPresentST): MapState => ({
  name: s.name,
  items: TodosPresentQR.getVisibleItems(s),
  inputValue: TodosPresentQR.getInputValue(s),
  todosCountStatusLabel: TodosPresentQR.getTodosCountStatusLabel(s),
  toggleVisibleItemsBtnLabel: TodosPresentQR.getToggleVisibleItemsBtnLabel(s),
  styled: { bg: s.bgColor }
})

const mapDispatch = (dispatch: Dispatch<AnyAction>): MapDispatch =>
  bindActionCreators(
    {
      handleClickToggle: Todos.creators.toggleShowAll,
      handleSubmit: Todos.creators.addTodo,
      handleInputChange: Todos.creators.setInputValue,
      handleClickDone: Todos.creators.setItemDone
    },
    dispatch
  )

export const TodosContainer = connect(
  (store: StoreST) => mapState(store.todos),
  (dispatch: Dispatch<AnyAction>) => mapDispatch(dispatch)
)(props => <TodosComponent {...props} />)
