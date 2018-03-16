import { connect } from 'preact-redux'

// ______________________________________________________

export function CounterComponent({ model, increment, decrement, setNestedValue }) {
  return (
    <div>
      <h1>{model.name}</h1>
      <p>count = {model.count}</p>
      <p>expo2 = {model.expo2()}</p>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  )
}

// ______________________________________________________

export function ConnectedComponent({ modelName, creators }) {
  const Component = connect(state => ({ model: state[modelName] }), creators)(
    ({ model, increment, decrement }) => {
      return (
        <CounterComponent
          model={model}
          increment={increment}
          decrement={decrement}
        />
      )
    }
  )
  return <Component />
}
