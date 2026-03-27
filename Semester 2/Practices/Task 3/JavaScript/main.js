document.addEventListener("DOMContentLoaded", function() {
    const dataForm = d3.select("#graph_settings");

    const maxCheckbox = dataForm.select('input[value="max"]');
    const avgCheckbox = dataForm.select('input[value="avg"]');
    const minCheckbox = dataForm.select('input[value="min"]');

    let checkboxes = [maxCheckbox, avgCheckbox, minCheckbox];

    checkboxes.forEach(d => {
        d.on("change", () => {
            checkboxes.forEach(cb => {
                cb.style("outline", "none");
            });
        })
    });
    
    drawGraph(animals, dataForm);

    const buildButton = dataForm.select('input[value="Построить"]');
    buildButton.on('click', () => {
        drawGraph(animals, dataForm);
    });

    createTable(animals, 'list');

    const form = d3.select('#filter');
    const findBtn = form.select('input[value="Найти"]');
    const clearBtn = form.select('input[value="Очистить фильтры"]');

    clearBtn.on('click', function() {
        clearFilter('list', animals, form.node()); 
    });

    const sortForm = d3.select('#sort');

    const resetSortBtn = sortForm.select('input[value="Сбросить сортировку"]');
    resetSortBtn.on('click', function() {
        clearSort('list', sortForm.node()); 
    });

    findBtn.on('click', function() {
        resetSortForm(sortForm.node()); 
        filterTable(animals, 'list', form.node()); 
    });
    
    setSortSelects(animals, sortForm.node());

    const fieldsFirst = d3.select('#fields1');
    fieldsFirst.on('change', function() {
        changeNextSelect(this, 'fields2');
    });

    const fieldsSecond = d3.select('#fields2');
    fieldsSecond.on('change', function() {
        changeNextSelect(this, 'fields3');
    });

    const sortBtn = sortForm.select('input[value="Сортировать"]');
    sortBtn.on('click', function() {
        sortTable('list', sortForm.node()); 
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
    
    const allSelect = dataForm.querySelectorAll('select');

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
    let nextSelect = d3.select(`#${nextSelectId}`).node();

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
        const fields3 = d3.select('#fields3').node();
        const fields1 = d3.select('#fields1').node();
        fields3.innerHTML = fields1.innerHTML;
        fields3.disabled = true;
    }
}