# Subscriptions

Subscription map in the same file scope where defined state.
It looks like a mutations but does not generate an `ActionType / ActionCreator`.
Unit subscription is equivalent to prior reducer sorted by conventional switch statement.

The subscription first argument take state of file scope.
**The method name and the payload schema have already been determined.**
Because, subscription follow origin what you defined.
The only remaining work is to define change the state.


```javascript
const TodosState = {
  date: new Date(),
  shouldUpdateTimerView: true,
  messegaFromTimer: 'no message available'
}
// ______________________________________________________
//
// @ Subscriptions

export const TodosSubscriptions = {
  Timer: {
    tick(state, date) {
      if (!state.shouldUpdateTimerView) return state
      return { ...state, date }
    }
    notifyProgressMessage(state, { message }) {
      return { ...state, messegaFromTimer: message }
    }
  }
}
```

Mutations are usually sufficient,This is useful when you start to be interested outside Action.
