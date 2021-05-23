import { lvar, and, run, eq } from 'logic_js'

const x = lvar<number, 'x'>('x')
const res = run([x], eq(x, 8))

type A = [number]
