declare module 'logic_js' {
  const TYPE: unique symbol
  const MAPPINGS: unique symbol
  interface ImmutableMap {
    constructor: { name: 'ImmutableMap' }
  }
  type Clause<M> = {
    [MAPPINGS]: M
    (sMap: ImmutableMap): Generator<ImmutableMap | null, void, never>
  }
  type ClauseFn<M> = () => Clause<M>
  type ClauseOrFn<M> = Clause<M> | ClauseFn<M>
  type Mapping<CF> = CF extends Clause<infer M>
    ? M
    : CF extends ClauseFn<infer M>
    ? M
    : never
  type Mappings<CFS> = { [K in keyof CFS]: Mapping<CFS[K]> }
  type And<MS extends {}[]> = MS extends [infer H, ...(infer T)]
    ? H & And<T>
    : {}
  type Or<MS extends {}[]> = MS extends [infer H, ...(infer T)]
    ? H | Or<T>
    : never
  const x: {
    eq<A extends symbol, B>(a: A, b: B): Clause<{ [a in A]: B }>
    eq<A, B extends symbol>(a: A, b: B): Clause<{ [b in B]: A }>
    eq<A>(a: A, b: A): Clause<{}>
    and<CS extends ClauseOrFn<any>[]>(
      ...clauses: [...CS]
    ): Clause<And<Mappings<CS>>>
    or<CS extends ClauseOrFn<any>[]>(
      count: number,
      ...clauses: [...CS]
    ): Clause<Or<Mappings<CS>>>
    or<CS extends ClauseOrFn<any>[]>(
      ...clauses: [...CS]
    ): Clause<Or<Mappings<CS>>>
    run<Vars extends symbol[], M extends { [k in Vars[number]] }>(
      vars: [...Vars],
      goal: ClauseOrFn<M>,
    ): { [Var in Vars[number]]: M[Var] }[]
    //facts<Args extends any[]>(...facs: Args[]): (...args: Args) => Clause
  }
  export = x
}
