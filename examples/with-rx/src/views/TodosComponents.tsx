import * as React from 'react'
import styled from 'styled-components'
import { TodoModel, TodoQR } from '../models/todo'

// ______________________________________________________
//
// @ Components

const TodoForm = (props: {
  inputValue: string
  handleSubmit: () => any
  handleInputChange: (payload: string) => any
}) =>
  <form onSubmit={e => {
    e.preventDefault()
    props.handleSubmit()
  }}>
    <input
      type='text'
      value={props.inputValue}
      onChange={(e: any) => props.handleInputChange(e.target.value)}
    />
    <button>addTodo</button>
  </form>

const TodoItem = (props: {
  todo: TodoModel
}) =>
  <div>
    <p>{TodoQR.getDateLabel(props.todo)}</p>
    <p>{props.todo.value}</p>
  </div>

// ______________________________________________________
//
// @ View

export type MapState = {
  name: string
  inputValue: string
  items: TodoModel[]
  styled: { bg: string }
}
export type MapDispatch = {
  handleSubmit: () => any
  handleInputChange: (payload: string) => any
}
type Props = MapState & MapDispatch & { className: string }

const View = (props: Props) => (
  <div className={props.className}>
    <h1>{props.name}</h1>
    <TodoForm
      inputValue={props.inputValue}
      handleSubmit={props.handleSubmit}
      handleInputChange={props.handleInputChange}
    />
    {props.items.map(todo =>
      <TodoItem
        key={todo.id}
        todo={todo}
      />
    )}
  </div>
)

// ______________________________________________________
//
// @ StyledView

const StyledView = styled<Props, any>(View)`
  flex: 1 0 auto;
  margin: 10px 20px;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid;
  background-color: ${props => props.styled.bg};
  > h1 {
    margin-bottom: 10px;
    font-size: 2rem;
    font-weight: bolder;
  }
  > p {
    margin-bottom: 10px;
  }
`

export const TodosComponent = StyledView
