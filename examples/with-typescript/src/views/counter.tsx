import { h } from 'preact'
import { connect } from 'preact-redux'
import { Store } from '../store'
import { Model, actions } from '../models/counter'

// ______________________________________________________

interface CounterComponentProps extends actions {
  model: Model
}
export function CounterComponent({
  model,
  increment,
  decrement,
  setNestedValue
}: CounterComponentProps) {
  return (
    <div>
      <h1>{model.name}</h1>
      <p>count = {model.count}</p>
      <p>expo2 = {model.expo2()}</p>
      <p>a.b.c = {model.a.b.c}</p>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={() => setNestedValue('immutable change')}>setNestedValue</button>
    </div>
  )
}

// ______________________________________________________

interface ConnectedComponentProps {
  actions: actions
  modelName: string
}
interface ConnectedProps extends actions {
  model: Model
}
export function ConnectedComponent({ actions, modelName }: ConnectedComponentProps) {
  const Component = connect(state => ({ model: state[modelName] }), actions)(
    (props: ConnectedProps) => {
      return (
        <CounterComponent
          model={props.model}
          increment={props.increment}
          decrement={props.decrement}
          setNestedValue={props.setNestedValue}
        />
      )
    }
  )
  return <Component />
}
