## Topics of this Example

Create different instances with same aggregate.
Even if the definition files are the same, it change the target state as another action by changing the specified namespace.

In order to confirm that different states are secured, There are changing the initial value to inject into the Reducer.

```javascript
export interface StoreST {
  counter1: CounterST
  counter2: CounterST
  counter3: CounterST
}

// ______________________________________________________

export const Counter1 = createAggregate(CounterMT, 'counter1/')
export const Counter2 = createAggregate(CounterMT, 'counter2/')
export const Counter3 = createAggregate(CounterMT, 'counter3/')

// ______________________________________________________

function storeFactory<R extends ReducersMapObject>(reducer: R): Store<StoreST> {
  return createStore(
    combineReducers(reducer),
    composeWithDevTools()
  )
}

export const store = storeFactory({
  counter1: Counter1.reducerFactory(
    CounterModel({
      name: 'COUNTER_1',
      count: 0,
      bgColor: '#ccc'
    })
  ),
  counter2: Counter2.reducerFactory(
    CounterModel({
      name: 'COUNTER_2',
      count: 10,
      bgColor: '#eee'
    })
  ),
  counter3: Counter3.reducerFactory(
    CounterModel({
      name: 'COUNTER_3',
      count: 100,
      bgColor: '#fff'
    })
  )
})

```

In the factory function of ViewContainer, extract the state of interest from the Store,
and select ActionCreator from the appropriate Aggregate.

By giving ActionCreators to default value of the argument, the inference type derived by TypeScript is kept.

```javascript
// ______________________________________________________
//
// @ Containers

const mapState = (s: CounterST): MapState => ({
  name: s.name,
  count: s.count,
  expo2: CounterQR.expo2(s),
  abc: s.a.b.c,
  styled: { bg: s.bgColor }
})

const mapDispatch = (creators = Counter1.creators) =>
  (dispatch: Dispatch<StoreST>): MapDispatch =>
    bindActionCreators({
      handleClickIncrement: creators.increment,
      handleClickDecrement: creators.decrement,
      handleClickNestedValue: creators.setNestedValue
    }, dispatch)

export const containerFactory = (
  selectState: (s: StoreST) => CounterST,
  creators = Counter1.creators // infered types
) =>
  connect(
    (store: StoreST) => mapState(selectState(store)),
    (dispatch: Dispatch<StoreST>) => mapDispatch(creators)(dispatch)
  )(props => <CounterComponent {...props} />)

const CT1 = containerFactory(s => s.counter1, Counter1.creators)
const CT2 = containerFactory(s => s.counter2, Counter2.creators)
const CT3 = containerFactory(s => s.counter3, Counter3.creators)

export default { CT1, CT2, CT3 }

```
