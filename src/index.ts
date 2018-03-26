import immer from 'immer'

// ______________________________________________________

function createActions(ctx, __fnnames__) {
  const types = {}
  const creators = {}
  Object.keys(__fnnames__).forEach(row => {
    const type = `${ctx}${row}`
    types[row] = type
    creators[row] = payload => ({ type, payload })
  })
  return { types, creators }
}

function createReducer(__actions__) {
  return function (initialModel) {
    return (model = initialModel, action) => {
      if (typeof __actions__[action.type] !== 'function') return model
      const payload = action.payload || {}
      return immer(model, draft => {
        __actions__[action.type].bind(draft)(payload)
      })
    }
  }
}

// ______________________________________________________

export function createAggregate(ctx, domain) {
  const { state, computed, actions } = domain
  const __actions__ = {}
  const __fnnames__ = {}
  Object.keys(actions).forEach(key => {
    __actions__[`${ctx}${key}`] = actions[key]
    __fnnames__[key] = key
  })
  const { types, creators } = createActions(ctx, __fnnames__)
  const reducer = createReducer(__actions__)
  const modeler = injects => (<any>Object).assign({}, state, injects, computed)
  return { types, creators, reducer, modeler }
}

export function reduceAggregate(aggregate, injects) {
  const { reducer, modeler } = aggregate
  return reducer(modeler(injects))
}
