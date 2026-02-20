let objGoods = {
    "ручка": [100, 50.60],
    "карандаш": [120, 30.00],
    "тетрадь": [200, 10.50]
};

let goods = [];

for (let name in objGoods) {
    let values = objGoods[name];
    for (let i = 0; i < values.length; i++) {
        goods.push({
            "name": name,
            "amount": values[i]
        });
    }
}
console.log(goods);