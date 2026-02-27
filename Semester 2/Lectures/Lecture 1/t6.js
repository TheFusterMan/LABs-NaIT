const add = (a, b) => a + b;
const mult = (a, b) => a * b;

const groupArr = (func, ...nums) => {
    return nums.reduce(func);
}

console.log(groupArr(add, 1, 2, 3, 4, 5));
console.log(groupArr(mult, 1, 2, 3, 4, 5));