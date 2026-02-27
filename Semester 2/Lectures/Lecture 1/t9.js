const pipe = (...funcs) =>
    x => funcs.reduce((acc, fn) => fn(acc), x);

const priceCalculator = (price, discount, coupon, fee = 10, tax = 30) => {
    const applyDiscount = val => val - price * discount / 100;
    const applyCoupon = val => val - coupon;
    const applyFee = val => val + fee;
    const applyTax = val => val * (1 + tax / 100);
    const applyRound = val => Math.round(val * 100) / 100;

    return pipe(applyDiscount, applyCoupon, applyFee, applyTax, applyRound)(price);
};

console.log(priceCalculator(145, 10, 40));