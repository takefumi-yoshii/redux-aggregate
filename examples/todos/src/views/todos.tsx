import { h } from 'preact'
import { connect } from 'preact-redux'
import { Store } from '../store'
import { Model, creators } from '../models/todos'

// ______________________________________________________

interface TodosComponentProps extends creators {
  model: Model
}
export function TodosComponent({
  model,
  setInputValue,
  addTodo
}: TodosComponentProps) {
  const items = model.todos.map(todo => {
    return (
      <div>
        <p>{todo.getDateLabel()}</p>
        <p>{todo.value}</p>
      </div>
    )
  })
  return (
    <div>
      <h1>{model.name}</h1>
      <form onSubmit={e => {
        e.preventDefault()
        addTodo()
      }}>
        <input
          type='text'
          value={model.getInputValue()}
          onChange={(e: any) => setInputValue(e.target.value)}
        />
        <button>addTodo</button>
      </form>
      {items}
    </div>
  )
}

// ______________________________________________________

interface ConnectedComponentProps {
  creators: creators
  modelName: string
}
interface ConnectedProps extends creators {
  model: Model
}
export function ConnectedComponent({ modelName, creators }: ConnectedComponentProps) {
  const Component = connect(state => ({ model: state[modelName] }), creators)(
    (props: ConnectedProps) => {
      return (
        <TodosComponent
          model={props.model}
          addTodo={props.addTodo}
          setInputValue={props.setInputValue}
        />
      )
    }
  )
  return <Component />
}
