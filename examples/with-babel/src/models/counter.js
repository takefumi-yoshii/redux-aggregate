export const state = { count: 0 }
export const computed = {
  expo2() { return this.count ** 2 }
}
export const actions = {
  increment() { this.count++ },
  decrement() { this.count-- }
}
export const domain = { state, computed, actions }
