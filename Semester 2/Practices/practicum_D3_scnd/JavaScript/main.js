document.addEventListener("DOMContentLoaded", function() {
    makeSelectOptions('#x_keys', Object.keys(buildings[0]))

    const xKeysSelector = document.querySelector("#x_keys");
    xKeysSelector.addEventListener("change", function(e) {
        drawGraph(buildings);
    })

    drawGraph(buildings);

    const maxHeightCheckbox = document.getElementById("max_height");
    maxHeightCheckbox.addEventListener("change", function() {
        drawGraph(buildings);
    })
    const minHeightCheckbox = document.getElementById("min_height");
    minHeightCheckbox.addEventListener("change", function() {
        drawGraph(buildings);
    })

    showTable('build', buildings);
    const table = document.getElementById('build');

    const toggleTableButton = document.querySelector('input[value="Скрыть таблицу"]');
    toggleTableButton.addEventListener('click', (e) => {
        table.classList.toggle('hidden');

        if (table.classList.contains('hidden')) {
            hideTable('build');
            e.target.value = 'Показать таблицу';
        } else {
            showTable('build', buildings);
            e.target.value = 'Скрыть таблицу';
        }
    });
})

function makeSelectOptions(selectId, data) {
    const options = d3.select(selectId)
        .selectAll('option')
        .data(data)
        .enter()
        .append('option')
        .text(d => d);

    options.nodes()[2].selected = true;
}