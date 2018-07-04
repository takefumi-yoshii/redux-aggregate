import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StoreST, Todos } from '../store'
import { TodosPresentQR, TodosPresentST } from '../models/todos_present'
import TodosComponent, { MapState, MapDispatch } from './TodosComponent'

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

const mapDispatch = (dispatch: Dispatch<StoreST>): MapDispatch =>
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
  (dispatch: Dispatch<StoreST>) => mapDispatch(dispatch)
)(props => <TodosComponent {...props} />)
