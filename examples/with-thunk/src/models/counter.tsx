// ______________________________________________________
//
// @ types

export interface state {
  name?: string
  count?: number
  autoIncrement: boolean
}
export interface computed {
  getCount(): number
  expo2(): number
  getAutoIncrementBtnLabel(): string
}
export interface actions {
  increment?(): void
  decrement?(): void
  toggleAutoIncrement?(): void
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
  autoIncrement: false
}

export const computed: This & computed = {
  getCount(): number {
    return this.count
  },
  expo2(): number {
    return this.count ** 2
  },
  getAutoIncrementBtnLabel(): string {
    return this.autoIncrement ? 'stop' : 'start'
  }
}

export const actions: This & actions = {
  increment(): void {
    this.count++
  },
  decrement(): void {
    this.count--
  },
  toggleAutoIncrement(): void {
    this.autoIncrement = !this.autoIncrement
  }
}

export const domain = { state, computed, actions }
