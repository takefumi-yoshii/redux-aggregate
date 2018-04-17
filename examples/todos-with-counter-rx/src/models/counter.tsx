// ______________________________________________________
//
// @ types

export interface state {
  name?: string
  count?: number
  todoCount?: number
}
export interface computed {
  getCount(): number
  expo2(): number
  getCountSum(): number
}
export interface actions {
  increment?(): void
  decrement?(): void
  setTodoCount?(value: number): void
}
export interface Model extends state, computed {}
export interface creators extends actions {}
type This = ThisType<Model>

// ______________________________________________________
//
// @ Domain

export const state: state = {
  name: '',
  count: 0,
  todoCount: 0
}

export const computed: This & computed = {
  getCount(): number {
    return this.count
  },
  expo2(): number {
    return this.count ** 2
  },
  getCountSum(): number {
    return this.count + this.todoCount
  }
}

export const actions: This & actions = {
  increment(): void {
    this.count++
  },
  decrement(): void {
    this.count--
  },
  setTodoCount(value: number): void {
    console.log(value)
    this.todoCount = value
  }
}

export const domain = { state, computed, actions }
