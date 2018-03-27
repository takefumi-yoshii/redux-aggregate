// ______________________________________________________
//
// @ types

export interface state {
  value: string
  date: Date
}
export interface computed {
  getDateLabel(): string
}
export interface Model extends state, computed {}
type This = ThisType<Model>

// ______________________________________________________
//
// @ Domain

export const state: state = {
  value: '',
  date: new Date()
}

export const computed: This & computed = {
  getDateLabel(): string {
    const month = this.date.getMonth() + 1
    const date = this.date.getDate()
    const hour = this.date.getHours()
    const minute = this.date.getMinutes()
    const second = this.date.getSeconds()
    return `${month}/${date} ${hour}:${minute}:${second}`
  }
}

export const Model = injects => ({ ...state, ...injects, ...computed })
