declare module 'logic_js' {
  const VAR: unique symbol
  type LVar<T, name extends string> = T & { [VAR]: name }
  interface ImmutableMap {
    constructor: { name: 'ImmutableMap' }
  }
  type Clause = (
    sMap: ImmutableMap,
  ) => Generator<ImmutableMap | null, void, never>
  type Lookup<name extends string, B extends LVar<any, any>[]> =
    B extends [LVar<infer H, name>, ...any]
      ? H
      : B extends [any, ...(infer T)]
        ? Lookup<name, T>
        : never

  type ClauseFn = () => Clause
  type ClauseOrFn = Clause | ClauseFn

  const x: {
    lvar<T>(): LVar<T, `~.${any}`>
    lvar<T, name extends string>(name: name): LVar<T, name>
    run<Vars extends LVar<any, any>[]>(
      count: number,
      vars: [...Vars],
      goal: ClauseOrFn,
    ): { [name in Vars[number][typeof VAR]]: Lookup<name, Vars> }[]
    run<Vars extends LVar<any, any>[]>(
      vars: [...Vars],
      goal: ClauseOrFn,
    ): { [name in Vars[number][typeof VAR]]: Lookup<name, Vars> }[]
    and(...clauses: ClauseOrFn[]): Clause
    or(count: number, ...clauses: ClauseOrFn[]): Clause
    or(...clauses: ClauseOrFn[]): Clause
    eq<A>(a: A, b: A): Clause
    facts<Args extends any[]>(...facs: [...Args][]): (...args: Args) => Clause
    conso<A, B extends any[]>(a: A, b: B, l: [A, ...B]): Clause
    firsto<A>(a: A, l: [A, ...any]): Clause
    resto<L extends any[]>(a: L, l: [any, ...L]): Clause
    emptyo(l: any[]): Clause
    membero<A>(a: A, l: A[]): Clause
    appendo<A>(a: A[], b: A[], l: A[]): Clause
    add(a: number, b: number, c: number): Clause
    sub(a: number, b: number, c: number): Clause
    mul(a: number, b: number, c: number): Clause
    div(a: number, b: number, c: number): Clause
    lt(a: number, b: number): Clause
    le(a: number, b: number): Clause
    gt(a: number, b: number): Clause
    ge(a: number, b: number): Clause
    stringo(a: any): Clause
    numbero(a: any): Clause
    arrayo(a: any): Clause
    succeed(): Clause
    fail(): Clause
    anyo(goal: ClauseOrFn): Clause
  }
  export = x
}
