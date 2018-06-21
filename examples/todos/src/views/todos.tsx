import * as React from 'react'
import { connect } from 'react-redux'
import { StoreST, Todos } from '../store'
import { TodosQR } from '../models/todos'
import { TodoModel, TodoQR } from '../models/todo'

// ______________________________________________________
//
// @ Container

export const TodosContainer = connect(
  (s: StoreST) => ({
    name: s.todos.name,
    items: s.todos.items,
    inputValue: TodosQR.getInputValue(s.todos)
  }),
  {
    handleSubmit: Todos.creators.addTodo,
    handleInputChange: Todos.creators.setInputValue
   }
)(p =>
  <div>
    <h1>{p.name}</h1>
    <TodoForm
      inputValue={p.inputValue}
      handleSubmit={p.handleSubmit}
      handleInputChange={p.handleInputChange}
    />
    {p.items.map(todo =>
      <TodoItem
        todo={todo}
      />
    )}
  </div>
)

// ______________________________________________________
//
// @ Components

const TodoForm = (p: {
  inputValue: string
  handleSubmit: () => any
  handleInputChange: (payload: string) => any
}) =>
  <form onSubmit={e => {
    e.preventDefault()
    p.handleSubmit()
  }}>
    <input
      type='text'
      value={p.inputValue}
      onChange={(e: any) => p.handleInputChange(e.target.value)}
    />
    <button>addTodo</button>
  </form>


const TodoItem = (p: {
  todo: TodoModel
}) =>
  <div>
    <p>{TodoQR.getDateLabel(p.todo)}</p>
    <p>{p.todo.value}</p>
  </div>
