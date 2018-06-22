import * as React from 'react'

export default (props: {
  inputValue: string
  handleSubmit: () => any
  handleInputChange: (payload: string) => any
}) => (
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
)
