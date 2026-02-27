const numbers = [10, 5, 8, 1, 30, -2, 15];
const min = numbers.reduce((a, b) => a > b ? b : a);

console.log(min);