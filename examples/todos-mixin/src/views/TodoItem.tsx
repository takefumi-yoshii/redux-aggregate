import * as React from 'react'
import { TodoModel } from '../models/todo'

export default (props: {
  todo: TodoModel
  handleClickDone: (payload: { id: string, done: boolean }) => any
}) => (
  <div>
    <p>{props.todo.value}</p>
    {!props.todo.done && (
      <button onClick={() => props.handleClickDone({ id: props.todo.id, done: true })}>
        done
      </button>
    )}
  </div>
)
