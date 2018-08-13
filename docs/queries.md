# Queries

### Give the behavior of Model to State

Normal Redux only projects state, but depending on requirements, this will be unsatisfactory.

By focusing on the state in the same file scope, it can add methods to use state.
**The State now has behavior as a `Model`, It same as `computed` in another library.**
Be careful to handle the state schema immediately above.

```javascript
const state = {
  count: 0,
  unit: 'pt'
}
// ______________________________________________________
//
// @ Queries

function expo2 (state) {
  return state.count ** 2
}
function getCountLabel (state) {
  return `${state.count}${state.unit}`
}
export const Queries = {
  expo2,
  getCountLabel
}
```
