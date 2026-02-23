/*формируем массив для сортировки по двум уровням вида
 [
 {column: номер столбца, по которому осуществляется сортировка,
 direction: порядок сортировки (true по убыванию, false по возрастанию)
 },
 ...
 ]
*/
const createSortArr = (data) => {
    let sortArr = [];

    const sortSelects = data.getElementsByTagName('select');

    for (const item of sortSelects) {
        // получаем номер выбранной опции
        const keySort = item.value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем порядок сортировки очередного уровня
        // имя флажка сформировано как имя поля SELECT и слова Desc
        const desc = document.getElementById(item.id + 'Desc').checked;
        //очередной элемент массива - по какому столбцу и в каком порядке сортировать
        sortArr.push(
            {column: keySort - 1,
                direction: desc}
        );
    }
    return sortArr;
};

const sortTable = (idTable, formData) => {

    // формируем управляющий массив для сортировки
    const sortArr = createSortArr(formData);

    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        // САМОСТОЯТЕЛЬНО: Исправить функцию sortTable(): если во всех полях сортировки выбрано «Нет»,
        // восстановить на странице ту таблицу, которая была до применения сортировки.
        const filterForm = document.getElementById('filter');
        filterTable(buildings, idTable, filterForm);
        return false;
    }
    //находим нужную таблицу
    let table = document.getElementById(idTable);
    // преобразуем строки таблицы в массив
    let rowData = Array.from(table.rows);

    // удаляем элемент с заголовками таблицы
    const headerRow = rowData.shift();

    //сортируем данные по всем уровням сортировки
    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
            const firstCell = first.cells[column].innerHTML;
            const secondCell = second.cells[column].innerHTML;
            let comparison = 0;

            // САМОСТОЯТЕЛЬНО: Исправить функцию sortTable() так, чтобы данные в столбцах с числами (Год и
            // Высота) сортировались как числа, а не как строки.
            if (!isNaN(parseFloat(firstCell)) && !isNaN(parseFloat(secondCell))) {
                comparison = parseFloat(firstCell) - parseFloat(secondCell);
            } else {
                // используем localeCompare для корректного сравнения
                comparison = firstCell.localeCompare(secondCell);
            }

            // учитываем направление сортировки
            if (comparison !== 0) {
                return (direction ? -comparison : comparison);
            }
        }
        return 0;
    });

    //выводим отсортированную таблицу на страницу
    table.append(headerRow);

    let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });
    table.append(tbody);
}

