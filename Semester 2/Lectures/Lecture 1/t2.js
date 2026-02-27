const arr = [1, 2, 3, 4, 5];

let res = [
    ...arr.slice(0, 2),
    100,
    200,
    ...arr.slice(4),
];

console.log(res);