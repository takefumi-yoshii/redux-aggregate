// ______________________________________________________
//
// @ types

export interface state {
  name?: string
  count?: number
  a?: { b?: { c?: string | number } }
}
export interface computed {
  getCount(): number
  expo2(): number
}
export interface actions {
  increment?(): void
  decrement?(): void
  setNestedValue?(name: string): void
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
  a: { b: { c: 'c' } }
}

export const computed: This & computed = {
  getCount(): number {
    return this.count
  },
  expo2(): number {
    return this.count ** 2
  }
}

export const actions: This & actions = {
  increment(): void {
    this.count++
  },
  decrement(): void {
    this.count--
  },
  setNestedValue(value: string): void {
    this.a.b.c = value
  }
}

export const domain = { state, computed, actions }
