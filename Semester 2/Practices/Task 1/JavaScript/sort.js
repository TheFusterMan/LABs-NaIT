const createSortArr = (data) => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName('select');

    for (const item of sortSelects) {
        const keySort = item.value;

        if (keySort == 0) {
            break;
        }

        const desc = document.getElementById(item.id + '_desc').checked;

        sortArr.push(
            {
                column: keySort - 1,
                direction: desc
            }
        );
    }

    return sortArr;
};

const resetSortForm = (sortForm) => {
    const allSelect = sortForm.getElementsByTagName('select');

    for (let select of allSelect) {
        select.innerHTML = '';
    }

    setSortSelects(animals, sortForm);
    sortForm.reset();
};

const clearSort = (idTable, sortForm) => {
    resetSortForm(sortForm);

    const filterForm = document.getElementById('filter');
    filterTable(animals, idTable, filterForm);
};

const sortTable = (idTable, formData) => {
    const sortArr = createSortArr(formData);

    if (sortArr.length === 0) {
        const filterForm = document.getElementById('filter');
        filterTable(animals, idTable, filterForm);
        return false;
    }

    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);

    const headerRow = rowData.shift();

    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
            const firstCell = first.cells[column].innerHTML;
            const secondCell = second.cells[column].innerHTML;
            let comparison = 0;

            if (column === 3 || column === 4) {
                comparison = parseFloat(firstCell) - parseFloat(secondCell);
            } else {
                comparison = firstCell.localeCompare(secondCell);
            }

            if (comparison !== 0) {
                return (direction ? -comparison : comparison);
            }
        }

        return 0;
    });

    table.append(headerRow);

    let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });

    table.append(tbody);
}

