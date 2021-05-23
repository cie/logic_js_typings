declare module 'logic_js' {
  const TYPE: unique symbol
  interface LVar<Type, ID extends string | undefined> {
    [TYPE]: Type
    constructor: { name: 'LVar' }
    id: ID
  }
  interface ImmutableMap {
    constructor: { name: 'ImmutableMap' }
  }
  type Clause = (
    sMap: ImmutableMap,
  ) => Generator<ImmutableMap | null, void, never>
  type Lookup<A, B extends LVar<any, any>[]> = B extends [infer H, ...(infer T)]
    ? H
    : never
  type Resolve<V> = V extends LVar<infer T, any> ? V | T : never
  const x: {
    lvar<Type>(): LVar<Type, string>
    lvar<Type, ID extends string>(id: ID): LVar<Type, ID>
    eq<X>(a: X | LVar<X, any>, b: X | LVar<X, any>): Clause
    and(...clauses: (Clause | (() => Clause))[]): Clause
    or(count: number, ...clauses: (Clause | (() => Clause))[]): Clause
    or(...clauses: (Clause | (() => Clause))[]): Clause
    run<Vars extends LVar<any, any>[]>(
      vars: [...Vars],
      goal: Clause | (() => Clause),
    ): { [Var in Vars[number]['id']]: Resolve<Lookup<Var, Vars>> }[]
    facts<Args extends any[]>(...facs: Args[]): (...args: Args) => Clause
  }
  export = x
}
