# createActions

### ✅ Reduce verbose action type

This api return `ActionTypes / ActionCreators`.
First argument is map of `ActionSources`.
Second argument is a unique namespace.With this, ActionType won't conflict.

```javascript
import { createActions } from 'redux-aggregate'
import { ActionSources } from 'path/to/actions/timer'
const {
  types,    // Generated ActionTypes
  creators  // Generated ActionCreators
} = createActions(ActionSources, 'timer/')
```

**By this alone, completed to define AcrtionCreators with inferred type.**

Related: [Define ActionSources ->](actionSources.md)
