import { and, or, run, eq } from 'logic_js'

const parent = <X extends string | symbol, Y extends string | symbol>(
  x: X,
  y: Y,
) => or(and(eq(x, 'mary'), eq(y, 'john')), and(eq(x, 'mary'), eq(y, 'john')))

const x = Symbol()
const y = Symbol()
const res = run([x, y], parent(x, y))

type A = { [k in number] }

let l = () => {
  const a = Symbol(),
    b = Symbol()
  return [a, b] as [typeof a, typeof b]
}
const d = l()
const h = l()
if (d[0] == h[0]) {
}
