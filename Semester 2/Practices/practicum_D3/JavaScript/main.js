document.addEventListener("DOMContentLoaded", function() {
    const width = 1280;
    const height = 1280;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height) ;

    const settingForm = document.getElementById("setting");

    const drawButton = settingForm.querySelector('input[value="Нарисовать"]');
    const clearButton = settingForm.querySelector('input[value="Очистить"]')
    const animateButton = settingForm.querySelector('input[value="Анимировать"]');
    drawButton.addEventListener('click', () => draw(settingForm));
    clearButton.addEventListener('click', () => clear(svg));
    animateButton.addEventListener('click', () => runAnimation(settingForm));

    const animCheckbox = document.getElementById('animation');
    const pathAnimCheckbox = document.getElementById('path_animation');
    animCheckbox.addEventListener('change', (e) => enableAnimsFields(e.target.checked, drawButton, animateButton, pathAnimCheckbox));
    pathAnimCheckbox.addEventListener('change', (e) => enablePathAnimsFields(e.target.checked));
});

const draw = (dataForm) => {
    const svg = d3.select("svg")
    let pict = drawSmile(svg)
    pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) scale(${dataForm.sx.value}, ${dataForm.sy.value}) rotate(${dataForm.ang.value}, ${dataForm.cx.value}, ${dataForm.cy.value})`);
}

const clear = (svg) => {
    svg.selectAll('*').remove();
}

const runAnimation = (dataForm) => {
    const svg = d3.select("svg")
    let pict = drawSmile(svg);

    const animsTypesSelect = document.getElementById('animations_types_select');
    let animType;

    switch (animsTypesSelect.value) {
        case "linear":
            animType = d3.easeLinear;
            break;
        case "elastic":
            animType = d3.easeElastic;
            break;
        case "bounce":
            animType = d3.easeBounce;
            break;
    }

    const isPathAnim = document.getElementById('path_animation').checked;

    if (!isPathAnim) {
        pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) scale(${dataForm.sx.value}, ${dataForm.sy.value}) rotate(${dataForm.ang.value}, ${dataForm.cx.value}, ${dataForm.cy.value})`)
            .transition()
            .duration(6000)
            .ease(animType)
            .attr("transform", `translate(${dataForm.cx_finish.value}, ${dataForm.cy_finish.value}) scale(${dataForm.sx_finish.value}, ${dataForm.sy_finish.value}) rotate(${dataForm.ang_finish.value}, ${dataForm.cx_finish.value}, ${dataForm.cy_finish.value})`);
    } else {
        const pathType = document.getElementById('paths_settings').getElementsByTagName('select')[0].selectedIndex;
        let path = drawPath(pathType);
        pict
            .transition()
            .ease(animType) // установить в зависимости от настроек формы
            .duration(6000)
            .attrTween('transform', translateAlong(path.node()));
    }
}

const enableAnimsFields = (isChecked, drawButton, animateButton, pathAnimCheckbox) => {
    expandIds = ['cx_expand', 'cy_expand', 'sx_expand', 'sy_expand', 'ang_expand', 'animation_expand'];

    if (isChecked) {
        expandIds.forEach(id => document.getElementById(id).style.display = '');
        drawButton.style.display = 'none';
        animateButton.style.display = '';
    } else {
        expandIds.forEach(id => document.getElementById(id).style.display = 'none');
        drawButton.style.display = '';
        animateButton.style.display = 'none';

        if (pathAnimCheckbox.checked) {
            pathAnimCheckbox.click();
        }
    }
}

const enablePathAnimsFields = (isChecked) => {
    pathsSettings = document.getElementById('paths_settings');
    settingsToToggle = ['coords_settings', 'scale_settings', 'rotation_settings'];


    if (isChecked) {
        settingsToToggle.forEach(settingsId => document.getElementById(settingsId).style.display = 'none');
        pathsSettings.style.display = '';
    } else {
        settingsToToggle.forEach(settingsId => document.getElementById(settingsId).style.display = '');
        pathsSettings.style.display = 'none';
    }
}