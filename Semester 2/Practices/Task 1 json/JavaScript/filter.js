const getFilterCriteria = () => {
    const form = document.getElementById("filterForm");
    const inputs = form.getElementsByTagName("input");

    return {
        nameVal: inputs[0].value.toLowerCase(),
        catVal: inputs[1].value.toLowerCase(),
        breedVal: inputs[2].value.toLowerCase(),
        qtyFrom: parseInt(inputs[3].value) || -Infinity,
        qtyTo: parseInt(inputs[4].value) || Infinity,
        priceFrom: parseFloat(inputs[5].value) || -Infinity,
        priceTo: parseFloat(inputs[6].value) || Infinity,
    };
};

const filterData = (data, criteria) => {
    return data.filter(item => {
        const matchesName = !criteria.nameVal || item.name.toLowerCase().includes(criteria.nameVal);
        const matchesCat = !criteria.catVal || item.cat.toLowerCase().includes(criteria.catVal);
        const matchesBreed = !criteria.breedVal || item.breed.toLowerCase().includes(criteria.breedVal);
        const matchesQty = item.qty >= criteria.qtyFrom && item.qty <= criteria.qtyTo;
        const matchesPrice = item.price >= criteria.priceFrom && item.price <= criteria.priceTo;

        return matchesName && matchesCat && matchesBreed && matchesQty && matchesPrice;
    });
};