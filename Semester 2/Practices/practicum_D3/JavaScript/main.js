document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height) ;

    const settingForm = document.getElementById("setting");
    const drawButton = settingForm.querySelector('input[value="Нарисовать"]');

    drawButton.addEventListener('click', () => draw(settingForm));
});

const draw = (dataForm) => {
    const svg = d3.select("svg")
    let pict = drawSmile(svg)
    pict.attr("transform", `translate(${dataForm.cx.value},
                                      ${dataForm.cy.value})`);
    pict.attr("transform", `scale(${dataForm.sx.value},
                                  ${dataForm.sy.value})`);
    pict.attr("transform", `rotate(${dataForm.ang.value},
                                  ${dataForm.cx.value},
                                  ${dataForm.cy.value})`)
}