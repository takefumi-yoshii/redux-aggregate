import { h } from 'preact'
import { connect } from 'preact-redux'
import { StoreST, Todos } from '../store'
import { TodosPresentQR, TodosPresentPL } from '../models/todos_present'
import { TodoModel, TodoQR } from '../models/todo'

// ______________________________________________________
//
// @ Components

const Component = (p: {
  name: string
  items: TodoModel[],
  inputValue: string,
  todosCountStatusLabel: string,
  toggleVisibleItemsBtnLabel: string,
  addTodo: () => void
  setInputValue: (pl: TodosPresentPL['setInputValue']) => void
  setItemDone: (pl: TodosPresentPL['setItemDone']) => void
  toggleShowAll: () => void
}) =>
  <div>
    <h1>{p.name}</h1>
    <p>{p.todosCountStatusLabel}</p>
    <p>
      <button onClick={() => p.toggleShowAll()}>
        {p.toggleVisibleItemsBtnLabel}
      </button>
    </p>
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
        <p>{todo.value}</p>
        {!todo.done && (
          <button onClick={() => p.setItemDone({ id: todo.id, done: true })}>
            done
          </button>
        )}
      </div>
    )}
  </div>

// ______________________________________________________
//
// @ Containers

export const TodosContainer = connect(
  (s: StoreST) => ({
    name: s.todos.name,
    items: TodosPresentQR.getVisibleItems(s.todos),
    inputValue: TodosPresentQR.getInputValue(s.todos),
    todosCountStatusLabel: TodosPresentQR.getTodosCountStatusLabel(s.todos),
    toggleVisibleItemsBtnLabel: TodosPresentQR.getToggleVisibleItemsBtnLabel(s.todos)
  }),
  { ...Todos.creators }
)(props => <Component {...props} />)
