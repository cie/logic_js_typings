declare module 'logic_js' {
  type LVar<T, name extends string> = T & { [VAR]: name }
  const TYPE: unique symbol
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
  const VAR: unique symbol

  const x: {
    lvar<T>(): LVar<T, `~.${any}`>
    lvar<T, name extends string>(name: name): LVar<T, name>
    eq<A>(a: A, b: A): Clause
    and(...clauses: ClauseOrFn[]): Clause
    or(count: number, ...clauses: ClauseOrFn[]): Clause
    or(...clauses: ClauseOrFn[]): Clause
    run<Vars extends LVar<any, any>[]>(
      vars: [...Vars],
      goal: Clause | (() => Clause),
    ): { [name in Vars[number][typeof VAR]]: Lookup<name, Vars> }[]
    facts<Args extends any[]>(...facs: Args[]): (...args: Args) => Clause
  }
  export = x
}
