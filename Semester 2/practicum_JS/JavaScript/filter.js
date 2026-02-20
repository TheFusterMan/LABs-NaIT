// устанавливаем соответствие между полями формы и столбцами таблицы
const correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}

/* Структура возвращаемого ассоциативного массива:
{
 input_id: input_value,
 ...
}
*/
const dataFilter = (dataForm) => {

    let dictFilter = {};
    // перебираем все элементы формы с фильтрами
    for (const item of dataForm.elements) {
        if (!item.id) continue;

        // получаем значение элемента
        let valInput = item.value;
        // если поле типа text - приводим его значение к нижнему регистру
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
        } /* < - - - САМОСТОЯТЕЛЬНО обработать значения числовых полей:
        - если в поле занесено значение - преобразовать valInput к числу;
        - если поле пусто и его id включает From - занести в valInput
        -бесконечность
        - если поле пусто и его id включает To - занести в valInput
        +бесконечность
        */
        // формируем очередной элемент ассоциативного массива
        dictFilter[item.id] = valInput;
    }
    return dictFilter;
}

const filterTable = (data, idTable, dataForm) =>{

    // получаем данные из полей формы
    const datafilter = dataFilter(dataForm);

    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {
        /* в этой переменной будут "накапливаться" результаты сравнения данных
        с параметрами фильтра */
        let result = true;

        // строка соответствует фильтру, если сравнение всех значения из input
        // со значением ячейки очередной строки - истина
        Object.entries(item).map(([key, val]) => {
            const fieldMapping = correspond[key];

            // текстовые поля проверяем на вхождение
            if (typeof val == 'string') {
                result &&= val.toLowerCase().includes(datafilter[correspond[key]])
            }

            if (typeof val === 'number') {
                const [idFrom, idTo] = fieldMapping;
                result &&= (val >= datafilter[idFrom] && val <= datafilter[idTo]);
            } // < - - - САМОСТОЯТЕЛЬНО проверить числовые поля на принадлежность интервалу
        });
        return result;
    });

    clearTable(idTable); // < - - - САМОСТОЯТЕЛЬНО вызвать функцию, которая очищает таблицу с id=idTable

    if (tableFilter.length > 0) {
        createTable(tableFilter, idTable); // < - - - показать на странице таблицу с отфильтрованными строками
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

