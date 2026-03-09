document.addEventListener("DOMContentLoaded", function() {
    const width = 1280;
    const height = 1280;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height) ;

    const settingForm = document.getElementById("setting");
    const drawButton = settingForm.querySelector('input[value="Нарисовать"]');
    const clearButton = settingForm.querySelector('input[value="Очистить"]');

    drawButton.addEventListener('click', () => draw(settingForm));
    clearButton.addEventListener('click', () => clear(svg));
});

const draw = (dataForm) => {
    const svg = d3.select("svg")
    let pict = drawSmile(svg)
    pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) scale(${dataForm.sx.value}, ${dataForm.sy.value}) rotate(${dataForm.ang.value}, ${dataForm.cx.value}, ${dataForm.cy.value})`);
}

const clear = (svg) => {
    svg.selectAll('*').remove();
}