import * as React from 'react'
import { TodoST, TodoQR } from '../models/todo'

export default (props: {
  todo: TodoST
}) => (
  <div>
    <p>{TodoQR.getDateLabel(props.todo)}</p>
    <p>{props.todo.value}</p>
  </div>
)
