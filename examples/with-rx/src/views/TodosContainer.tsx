import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { StoreST, Todos } from '../store'
import { TodosQR, TodosST } from '../models/todos'
import { TodoST } from '../models/todo'
import TodosComponent from './TodosComponent'

// ______________________________________________________
//
// @ Types

export type MapState = {
  name: string
  inputValue: string
  items: TodoST[]
  timeLabel: string
  styled: { bg: string }
}

export type MapDispatch = {
  handleSubmit: () => any
  handleInputChange: (payload: string) => any
}

// ______________________________________________________
//
// @ Container

const mapState = (s: TodosST): MapState => ({
  name: s.name,
  items: s.items,
  inputValue: TodosQR.getInputValue(s),
  timeLabel: s.now,
  styled: { bg: s.bgColor }
})

const mapDispatch = (dispatch: Dispatch<AnyAction>): MapDispatch =>
  bindActionCreators(
    {
      handleSubmit: Todos.creators.addTodo,
      handleInputChange: Todos.creators.setInputValue
    },
    dispatch
  )

export const TodosContainer = connect(
  (store: StoreST) => mapState(store.todos),
  (dispatch: Dispatch<AnyAction>) => mapDispatch(dispatch)
)(TodosComponent)
