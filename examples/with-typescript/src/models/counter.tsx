// ______________________________________________________
//
// @ types

export interface state {
  name?: string
  count?: number
  a?: { i?: { u?: string | number } }
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
type This = ThisType<Model>

// ______________________________________________________
//
// @ Domain

export const state: state = {
  name: '',
  count: 0,
  a: { i: { u: 'e' } }
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
  setNestedValue(name: string): void {
    this.a.i.u = name
  }
}

export const domain = { state, computed, actions }
