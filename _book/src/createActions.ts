import { namespaced } from './namespaced'
import { KeyMap } from '../typings/utils'
import { ActionTypes } from '../typings/commons'
import { ActionsSrc, ActionCreators, Actions } from '../typings/createActions'

// ______________________________________________________

function createActions<T extends KeyMap & ActionsSrc<T>>(
  actionsSrc: T,
  namespace: string
): Actions<T> {
  if (
    namespaced[namespace] !== undefined &&
    process.env.NODE_ENV !== 'development'
  ) {
    throw new Error(`redux-aggregate: conflict namespace -> ${namespace}`)
  } else {
    namespaced[namespace] = namespace
  }
  const types: KeyMap = {}
  const creators: KeyMap = {}
  const __srcmap__: KeyMap = {}
  Object.keys(actionsSrc).forEach(key => {
    const type = `${namespace}${key}`
    types[key] = type
    creators[key] = (payload?: any) => ({
      type,
      payload: actionsSrc[key](payload)
    })
    __srcmap__[type] = actionsSrc[key]
  })
  return {
    __namespace__: namespace,
    __srcmap__: __srcmap__ as T,
    types: types as ActionTypes<T>,
    creators: creators as ActionCreators<T>
  }
}

// ______________________________________________________

export { createActions }
