// Входные данные:
//   data - исходный массив (например, buildings)
//   key - поле, по которому осуществляется группировка

function createArrGraph(data, keyX, keyY) {
    const groupObj = d3.group(data, d => d[keyX]);

    let arrGraph = [];
    for(let entry of groupObj) {
        const minMax = d3.extent(entry[1].map(d => d[keyY]));
        let minMaxAvg = [...minMax, (minMax[0] + minMax[1]) / 2];
        arrGraph.push({labelX : entry[0], values : minMaxAvg});
    }

    return arrGraph;
}

function drawGraph(data, dataForm) {
    // значения по оси ОХ
    const keyX = document.querySelector('input[name="x_values"]:checked').value;
    const keyY = document.querySelector('input[name="y_values"]:checked').value;

    // создаем массив для построения графика
    let arrGraph = createArrGraph(data, keyX, keyY);

    const svg = d3.select("svg")
    svg.selectAll('*').remove();

    // создаем словарь с атрибутами области вывода графика
    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 100
    }

    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area, ["max", "min"]);

    const collorsForOptions = {
        "max": "red",
        "avg": "yellow",
        "min": "blue",
    }

    let maxCheckbox = dataForm.querySelector('input[value="max"]');
    let avgCheckbox = dataForm.querySelector('input[value="avg"]');
    let minCheckbox = dataForm.querySelector('input[value="min"]');

    let checkboxes = [maxCheckbox, avgCheckbox, minCheckbox];
    let selectedOptions = checkboxes.filter(d => d.checked).map(d => d.value);

    let svgNode = svg.nodes()[0];

    if (selectedOptions.length === 0) {
        checkboxes.forEach(checkbox => {
            checkbox.style.outline = "2px solid red";
        });
        svgNode.style.display = "none";
    } else {
        svgNode.style.display = "block";
    }

    let type = dataForm.querySelector("#type").value;

    switch(type) {
        case "dots":
            selectedOptions.forEach(option => {
                createChart(svg, arrGraph, scX, scY, attr_area, collorsForOptions[option], option);
            });
            break;
        case "column":
            selectedOptions.forEach(option => {
                createHistogram(svg, arrGraph, scX, scY, attr_area, collorsForOptions[option], option);
            });
            break;
        case "graph":
            selectedOptions.forEach(option => {
                createPath(svg, arrGraph, scX, scY, attr_area, collorsForOptions[option], option);
                createChart(svg, arrGraph, scX, scY, attr_area, collorsForOptions[option], option);
            });
            break;
    }
}

function createAxis(svg, data, attr_area, options_to_show) {
    // находим интервал значений, которые нужно отложить по оси OY
    // максимальное и минимальное значение и максимальных высот по каждой стране
    let values = [];

    if (options_to_show.includes("min")) {
        values = values.concat(data.map(d => d.values[0]));
    }
    if (options_to_show.includes("max")) {
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

function createChart(svg, data, scaleX, scaleY, attr_area, color, option) {
    const r = 4;

    let value_type = option === "max" ? 1 : option === "min" ? 0 : 2;

    const dots = svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[value_type]) + (
            (d.values[0] === d.values[1] && option !== "avg")
            ? (option === "max") ? -r : r
            : 0
        ))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}

function createPath(svg, data, scaleX, scaleY, attr_area, color, option) {
    const collisionOffset = 4;
    const line_width = "2";
    let value_type = option === "max" ? 1 : option === "min" ? 0 : 2;

    const line = d3.line()
        .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .y(d => scaleY(d.values[value_type]) + (
            (d.values[0] === d.values[1] & option !== "avg")
            ? (option === "max") ? -collisionOffset : collisionOffset
            : 0
        ));

    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("stroke-width", line_width)
        .style("stroke", color)
}

function createHistogram(svg, data, scaleX, scaleY, attr_area, color, option) {
    const w = 4;

    let x_offset = option !== "avg"
        ? option === "max" ? -w : w
        : 0;
    let value_type = option === "max" ? 1 : option === "min" ? 0 : 2;

    const rects = svg.selectAll(".rects")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 - x_offset)
        .attr("y", d => scaleY(d.values[value_type]))
        .attr("width", w)
        .attr("height", d => attr_area.height - scaleY(d.values[value_type]) - 2 * attr_area.marginY)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}