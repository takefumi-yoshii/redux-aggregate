import * as React from 'react'
import { TodoST } from '../models/todo'

export default (props: {
  todo: TodoST
  handleClickDone: (payload: { id: string; done: boolean }) => any
}) => (
  <div>
    <p>{props.todo.value}</p>
    {!props.todo.done && (
      <button
        onClick={() => props.handleClickDone({ id: props.todo.id, done: true })}
      >
        done
      </button>
    )}
  </div>
)
