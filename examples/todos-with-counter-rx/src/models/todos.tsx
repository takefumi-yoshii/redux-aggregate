import { Model as TodoModel } from './todo'

// ______________________________________________________
//
// @ types

export interface state {
  name?: string
  input: string | number
  items?: TodoModel[]
}
export interface computed {
  getInputValue(): string
}
export interface actions {
  addTodo?(): void
  setInputValue?(value: string | number): void
}
export interface Model extends state, computed {}
export interface creators extends actions {}
type This = ThisType<Model>

// ______________________________________________________
//
// @ Domain

export const state: state = {
  name: '',
  input: null,
  items: []
}

export const computed: This & computed = {
  getInputValue(): string {
    if (this.input === null) return ''
    return `${this.input}`
  }
}

export const actions: This & actions = {
  addTodo(): void {
    const value = this.getInputValue()
    if (value === '') return
    const todo = TodoModel({ value, date: new Date() })
    this.items.push(todo)
    this.input = ''
  },
  setInputValue(value: string | number): void {
    this.input = value
  }
}

export const domain = { state, computed, actions }
