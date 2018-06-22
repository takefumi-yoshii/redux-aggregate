import * as React from 'react'
import { TodoModel, TodoQR } from '../models/todo'

export default (props: {
  todo: TodoModel
}) => (
  <div>
    <p>{TodoQR.getDateLabel(props.todo)}</p>
    <p>{props.todo.value}</p>
  </div>
)
