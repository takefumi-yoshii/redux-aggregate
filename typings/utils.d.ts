type KeyMap = { [K: string]: any }
type R<T> = T extends (...rest: any[]) => infer I ? I : never
type A1<T> = T extends (a1: infer I, ...rest: any[]) => any ? I : never
type A2<T> = T extends (a1: any, a2: infer I, ...rest: any[]) => any ? I : never
type ReturnVoid<T> = R<T> extends void ? void : never

// ______________________________________________________

type DiffKey<
  T extends string | number | symbol,
  U extends string | number | symbol
> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T]

type HasKeysDiff<T, M> = DiffKey<keyof M, keyof T> extends never
  ? false
  : DiffKey<keyof T, keyof M> extends never ? false : true

export { KeyMap, R, A1, A2, ReturnVoid, DiffKey, HasKeysDiff }
