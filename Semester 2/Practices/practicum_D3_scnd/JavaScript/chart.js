// Входные данные:
//   data - исходный массив (например, buildings)
//   key - поле, по которому осуществляется группировка

function createArrGraph(data, key) {
    const groupObj = d3.group(data, d => d[key]);

    let arrGraph = [];
    for(let entry of groupObj) {
        const minMax = d3.extent(entry[1].map(d => d['Высота']));
        arrGraph.push({labelX : entry[0], values : minMax});
    }

    return arrGraph;
}

function drawGraph(data, dataForm) {
    // значения по оси ОХ
    const keyX = document.querySelector('input[name="axis_selection"]:checked').value;

    // создаем массив для построения графика
    let arrGraph = createArrGraph(data, keyX);

    if (keyX === "Год") {
        arrGraph.sort((a, b) => a.labelX <= b.labelX ? -1 : 1);
    }

    const svg = d3.select("svg")
    svg.selectAll('*').remove();

    // создаем словарь с атрибутами области вывода графика
    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    }

    const isMaxHeight = dataForm.querySelector("#max_height").checked;
    const isMinHeight = dataForm.querySelector("#min_height").checked;
    let whichToShow = (isMaxHeight && isMinHeight) ? "both" : (isMinHeight ? "min" : (isMaxHeight ? "max" : ""));

    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area, whichToShow);

    // рисуем график
    if(isMaxHeight) {
        createChart(svg, arrGraph, scX, scY, attr_area, "red", true)
    }
    if(isMinHeight) {
        createChart(svg, arrGraph, scX, scY, attr_area, "blue", false)
    }
}

function createAxis(svg, data, attr_area, show_min_max) {
    // находим интервал значений, которые нужно отложить по оси OY
    // максимальное и минимальное значение и максимальных высот по каждой стране
    let values = [];

    if (["min", "both"].includes(show_min_max)) {
        values = values.concat(data.map(d => d.values[0]));
    }
    if (["max", "both"].includes(show_min_max)) {
        values = values.concat(data.map(d => d.values[1]));
    }

    const [min, max] = d3.extent(values);

    // функция интерполяции значений на оси
    // по оси ОХ текстовые значения
    const scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX]);

    const scaleY = d3.scaleLinear()
        .domain([min * 0.85, max * 1.1 ])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    // создание осей
    const axisX = d3.axisBottom(scaleX); // горизонтальная
    const axisY = d3.axisLeft(scaleY); // вертикальная

    // отрисовка осей в SVG-элементе
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, 
                                      ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text") // подписи на оси - наклонные
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);

    return [scaleX, scaleY]
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, is_max) {
    const r = 4;

    const dots = svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[is_max ? 1 : 0]))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}