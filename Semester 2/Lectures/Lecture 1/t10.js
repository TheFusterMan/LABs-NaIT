const factorial = x => x <= 1 ? 1 : x * factorial(x - 1);

const calculate = (x, func) => x > 1 ? func(x) + calculate(x - 1, func) : func(1);

const n = 5;

const res1 = calculate(n, (x) => factorial(x));
const res2 = calculate(n, (x) => Math.pow(x, x));
const res3 = calculate(n, (x) => 1 / factorial(x));

console.log(res1);
console.log(res2);
console.log(res3);