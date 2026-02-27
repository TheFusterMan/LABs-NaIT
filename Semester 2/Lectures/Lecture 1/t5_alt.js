let arr = [12, 17, 12, 67, 23, 23, 67, 8, 8, 9, 12, 8];
const unique = arr.filter( (item, index, arr) => arr.indexOf(item) === index );

console.log(unique);