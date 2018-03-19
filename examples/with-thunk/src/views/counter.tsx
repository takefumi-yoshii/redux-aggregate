import { h } from 'preact'
import { connect } from 'preact-redux'
import { Store } from '../store'
import { Model, creators } from '../models/counter'
import { toggleAutoIncrement } from '../thunks/counter'

// ______________________________________________________

interface CounterComponentProps extends creators {
  model: Model
}
export function CounterComponent({
  model,
  increment,
  decrement,
  toggleAutoIncrement
}: CounterComponentProps) {
  return (
    <div>
      <h1>{model.name}</h1>
      <p>count = {model.count}</p>
      <p>expo2 = {model.expo2()}</p>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={() => toggleAutoIncrement()}>
        {model.getAutoIncrementBtnLabel()}
      </button>
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
  const dispathActions = { ...creators, toggleAutoIncrement }
  const Component = connect(state => ({ model: state[modelName] }), dispathActions)(
    (props: ConnectedProps) => {
      return (
        <CounterComponent
          model={props.model}
          increment={props.increment}
          decrement={props.decrement}
          toggleAutoIncrement={props.toggleAutoIncrement}
        />
      )
    }
  )
  return <Component />
}
