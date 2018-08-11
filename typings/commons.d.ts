type ActionType = string
type ActionTypes<T> = { readonly [K in keyof T]: ActionType }

// ______________________________________________________

export { ActionType, ActionTypes }
