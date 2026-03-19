document.addEventListener("DOMContentLoaded", function() {
    const dataForm = document.getElementById("graph_settings");

    drawGraph(animals, dataForm);

    const buildButton = dataForm.querySelector('input[value="Построить"]');
    buildButton.addEventListener('click', () => {
        drawGraph(animals, dataForm);
    });

    createTable(animals, 'list');

    const form = document.getElementById('filter');
    const findBtn = form.querySelector('input[value="Найти"]');
    const clearBtn = form.querySelector('input[value="Очистить фильтры"]');

    clearBtn.addEventListener('click', function() {
        clearFilter('list', animals, form);
    });

    const sortForm = document.getElementById('sort');

    const resetSortBtn = sortForm.querySelector('input[value="Сбросить сортировку"]');
    resetSortBtn.addEventListener('click', function() {
        clearSort('list', sortForm);
    });

    findBtn.addEventListener('click', function() {
        resetSortForm(sortForm);
        filterTable(animals, 'list', form);
    });

    clearBtn.addEventListener('click', function() {
        resetSortForm(sortForm);
    });

    setSortSelects(animals, sortForm);

    const fieldsFirst = document.getElementById('fields1');
    fieldsFirst.addEventListener('change', function() {
        changeNextSelect(this, 'fields2');
    });

    const fieldsSecond = document.getElementById('fields2');
    fieldsSecond.addEventListener('change', function() {
        changeNextSelect(this, 'fields3');
    });

    const sortBtn = sortForm.querySelector('input[value="Сортировать"]');
    sortBtn.addEventListener('click', function() {
        sortTable('list', sortForm);
    });
});

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

const setSortSelect = (arr, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));

    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
}

const setSortSelects = (data, dataForm) => {
    const head = Object.keys(data[0]);
    const allSelect = dataForm.getElementsByTagName('select');

    let i = 0;
    for(const item of allSelect){
        setSortSelect(head, item);

        if (i !== 0) {
            item.disabled = true;
        }

        i += 1;
    }
}

const changeNextSelect = (curSelect, nextSelectId) => {
    let nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;

    if (curSelect.value != 0) {
        for (let i = 0; i < nextSelect.options.length; i++) {
            if (nextSelect.options[i].value === curSelect.value) {
                nextSelect.remove(i);
                break;
            }
        }
    } else {
        nextSelect.disabled = true;
    }

    if (nextSelectId === 'fields2') {
        const fields3 = document.getElementById('fields3');
        const fields1 = document.getElementById('fields1');
        fields3.innerHTML = fields1.innerHTML;
        fields3.disabled = true;
    }
}
