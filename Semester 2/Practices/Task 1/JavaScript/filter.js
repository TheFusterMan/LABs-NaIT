const correspond = {
    "Название животного": "animal_name",
    "Категория": "category",
    "Порода": "breed",
    "Наличие": "availability",
    "Количество": ["quantityFrom", "quantityTo"],
    "Цена, руб.": ["priceFrom", "priceTo"],
}

const dataFilter = (dataForm) => {
    let dictFilter = {};
    
    [...dataForm.elements].forEach((item) => {
        if (!item.id) return;

        let valInput = item.value;
        
        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        } else if (item.type === "number") {
            if (valInput === "") {
                if (item.id.includes("From")) {
                    valInput = -Infinity;
                } else if (item.id.includes("To")) {
                    valInput = Infinity;
                }
            } else {
                valInput = Number(valInput);
            }
        }
        
        dictFilter[item.id] = valInput;
    });

    return dictFilter;
}

const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);
    
    let tableFilter = data.filter(item => {
        let result = true;
        
        Object.entries(item).map(([key, val]) => {
            const fieldMapping = correspond[key];
            
            if (typeof val == 'string') {
                result &&= val.toLowerCase().includes(datafilter[fieldMapping])
            }

            if (typeof val === 'number') {
                const [idFrom, idTo] = fieldMapping;
                result &&= (val >= datafilter[idFrom] && val <= datafilter[idTo]);
            } 
        });

        return result;
    });

    clearTable(idTable); 

    if (tableFilter.length > 0) {
        createTable(tableFilter, idTable); 
    } else {
        const table = document.getElementById(idTable);
        const header = Object.keys(data[0]);
        const headerRow = createHeaderRow(header);
        table.append(headerRow);
    }
};

const clearFilter = (idTable, data, dataForm) => {
    dataForm.reset();
    clearTable(idTable);
    createTable(data, idTable);
};

