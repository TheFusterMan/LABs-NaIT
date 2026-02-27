const func = (...ars) =>
    [...(
    ars.map((ar) =>
    new Set(ar.filter((n) => Math.abs(n) >= 10 && Math.abs(n) <= 99)))
    .reduce((a, b) => a.intersection(b)))];

const arr1 = [5, 12, 12, 45, -88, 105, 7];
const arr2 = [12, 9, 45, -88, 22, 100];
const arr3 = [45, 12, -88, 99, 10];

console.log(func(arr1, arr2, arr3));