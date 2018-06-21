import * as React from 'react'
import { connect } from 'react-redux'
import { StoreST, Todos } from '../store'
import { TodosPresentQR } from '../models/todos_present'
import { TodoModel } from '../models/todo';

// ______________________________________________________
//
// @ Container

export const TodosContainer = connect(
  (s: StoreST) => ({
    name: s.todos.name,
    items: TodosPresentQR.getVisibleItems(s.todos),
    inputValue: TodosPresentQR.getInputValue(s.todos),
    todosCountStatusLabel: TodosPresentQR.getTodosCountStatusLabel(s.todos),
    toggleVisibleItemsBtnLabel: TodosPresentQR.getToggleVisibleItemsBtnLabel(s.todos)
  }),
  {
    handleClickToggle: Todos.creators.toggleShowAll,
    handleSubmit: Todos.creators.addTodo,
    handleInputChange: Todos.creators.setInputValue,
    handleClickDone: Todos.creators.setItemDone
   }
)(p =>
  <div>
    <h1>{p.name}</h1>
    <p>{p.todosCountStatusLabel}</p>
    <p>
      <button onClick={() => p.handleClickToggle()}>
        {p.toggleVisibleItemsBtnLabel}
      </button>
    </p>
    <TodoForm
      inputValue={p.inputValue}
      handleSubmit={p.handleSubmit}
      handleInputChange={p.handleInputChange}
    />
    {p.items.map(todo =>
      <TodoItem
        key={todo.id}
        todo={todo}
        handleClickDone={p.handleClickDone}
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
  handleClickDone: (payload: { id: string, done: boolean }) => any
}) =>
  <div>
    <p>{p.todo.value}</p>
    {!p.todo.done && (
      <button onClick={() => p.handleClickDone({ id: p.todo.id, done: true })}>
        done
      </button>
    )}
  </div>
