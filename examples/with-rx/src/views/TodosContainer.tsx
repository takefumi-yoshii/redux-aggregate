import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StoreST, Todos } from '../store'
import { TodosQR, TodosST } from '../models/todos'
import { TodosComponent, MapState, MapDispatch } from './TodosComponents'

// ______________________________________________________
//
// @ Container

const mapState = (s: TodosST): MapState => ({
  name: s.name,
  items: s.items,
  inputValue: TodosQR.getInputValue(s),
  styled: { bg: s.bgColor }
})

const mapDispatch = (dispatch: Dispatch<StoreST>): MapDispatch =>
  bindActionCreators({
    handleSubmit: Todos.creators.addTodo,
    handleInputChange: Todos.creators.setInputValue
  }, dispatch)

export const TodosContainer = connect(
  (store: StoreST) => mapState(store.todos),
  (dispatch: Dispatch<StoreST>) => mapDispatch(dispatch)
)(props => <TodosComponent {...props} />)
