import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreState, Todos } from '../store'
import { TodosQR, TodosPL } from '../models/todos'
import { TodoModel, TodoQR } from '../models/todo'

// ______________________________________________________
//
// @ Components

const Component = (props: {
  name: string
  items: TodoModel[],
  inputValue: string
  addTodo: () => void
  setInputValue: (p: TodosPL['setInputValue']) => void
}) =>
  <div>
    <h1>{name}</h1>
    <form onSubmit={e => {
      e.preventDefault()
      props.addTodo()
    }}>
      <input
        type='text'
        value={props.inputValue}
        onChange={(e: any) => props.setInputValue(e.target.value)}
      />
      <button>addTodo</button>
    </form>
    {props.items.map(todo =>
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
  (s: StoreState) => ({
    name: s.todos.name,
    items: s.todos.items,
    inputValue: TodosQR.getInputValue(s.todos)
  }),
  { ...Todos.creators }
)(props => <Component {...props} />)
