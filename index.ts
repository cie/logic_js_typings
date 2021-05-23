import { facts, lvar, and, or, run, eq, conso } from 'logic_js'

const parent = facts(['Mary', 'John'], ['Mary', 'Joe'], ['Joe', 'Jim'])
const ancestor = (a: string, b: string) =>
  or(parent(a, b), (x = lvar<string>()) => and(parent(a, x), ancestor(x, b)))

const x = lvar<string, 'x'>('x')
const y = lvar<string, 'y'>('y')
console.log(run([x, y], ancestor(x, y)))

const k = lvar<string[], 'k'>('k')
console.log(run([x, k], conso(x, k, ['a', 'b', 'c'])))
