import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreState, Todos } from '../store'
import { Q, P } from '../models/todos'
import { S as TodoS, Q as TodoQ } from '../models/todo'

// ______________________________________________________
//
// @ Components

const Component = (props: {
  name: string
  items: TodoS[],
  inputValue: string
  addTodo: () => void
  setInputValue: (p: P['setInputValue']) => void
}) =>
  <div>
    <h1>{props.name}</h1>
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
        <p>{TodoQ.getDateLabel(todo)}</p>
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
    inputValue: Q.getInputValue(s.todos)
  }),
  { ...Todos.creators }
)(props => <Component {...props} />)
