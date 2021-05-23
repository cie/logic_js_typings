import { lvar, and, or, run, eq } from 'logic_js'

const parent = (x: number, y: string) =>
  or(
    and(eq(x, 4), eq(y, 'john')),
    and(eq(x, 4), eq(y, 'john')),
    and(eq(x, 4), eq(y, 'jeff')),
  )

const x = lvar<number, 'x'>('x')
const y = lvar<string, 'y'>('y')
const res = run([x, y], parent(x, y))
