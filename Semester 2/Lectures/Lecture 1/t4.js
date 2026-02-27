const nums = [2, 2, 4, 1, 6, 12];

let avgs = nums.map((item, index, arr) => {
    const neighbors = [
        index > 0 ? arr[index - 1] : undefined,
        item,
        index < arr.length - 1 ? arr[index + 1] : undefined
    ].filter(item => item !== undefined);

    const sum = neighbors.reduce((a, b) => a + b);
    const avg = sum / neighbors.length;

    return Math.round(avg * 100) / 100;
});

console.log(avgs);