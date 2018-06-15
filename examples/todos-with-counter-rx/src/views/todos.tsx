import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreST, Todos } from '../store'
import { TodosQR, TodosPL } from '../models/todos'
import { TodoModel, TodoQR } from '../models/todo'

// ______________________________________________________
//
// @ Components

const Component = (p: {
  name: string
  items: TodoModel[],
  inputValue: string
  addTodo: () => void
  setInputValue: (pl: TodosPL['setInputValue']) => void
}) =>
  <div>
    <h1>{name}</h1>
    <form onSubmit={e => {
      e.preventDefault()
      p.addTodo()
    }}>
      <input
        type='text'
        value={p.inputValue}
        onChange={(e: any) => p.setInputValue(e.target.value)}
      />
      <button>addTodo</button>
    </form>
    {p.items.map(todo =>
      <div>
        <p>{TodoQR.getDateLabel(todo)}</p>
        <p>{todo.value}</p>
      </div>
    )}
  </div>

// ______________________________________________________
//
// @ Containers

export const TodosContainer = connect(
  (s: StoreST) => ({
    name: s.todos.name,
    items: s.todos.items,
    inputValue: TodosQR.getInputValue(s.todos)
  }),
  { ...Todos.creators }
)(props => <Component {...props} />)
