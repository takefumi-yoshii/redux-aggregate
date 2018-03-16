import { h } from 'preact'
import { connect } from 'preact-redux'
import { Store } from '../store'
import { Model, creators } from '../models/counter'

// ______________________________________________________

interface CounterComponentProps extends creators {
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
