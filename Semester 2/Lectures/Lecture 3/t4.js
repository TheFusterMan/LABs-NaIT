document.addEventListener("DOMContentLoaded", function() {
    let f = (x) => x ** 3 - 6 * x ** 2 + x + 5;
    let y = (x) => (x - 2) ** 2 - 6

    const a = -2;
    const b = 6;
    const n = 50;
    let h = (b - a) / (n - 1);

    let FGraph = Array.from({ length: n }, (_, i) => {
        const x = a + i * h;
        return { 'x': x, 'y': f(x) }
    });

    let YGraph = Array.from({ length: n }, (_, i) => {
        const x = a + i * h;
        return { 'x': x, 'y': y(x) }
    });

    let width = 600;
    let height = 600;
    let marginX = 50;
    let marginY = 50;
    const svg = d3.select("svg");

    let minMax = d3.extent([...FGraph, ...YGraph], d => d.y);
    let min = minMax[0];
    let max = minMax[1];

    let scaleX = d3.scaleLinear()
        .domain([a, b])
        .range([0, width - 2 * marginX])

    let scaleY = d3.scaleLinear()
        .domain([min, max])
        .range([height - 2 * marginY, 0]);

    let axisX = d3.axisBottom(scaleX);
    let axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform",`translate(${marginX}, ${scaleY(0) + marginY})`)
        .call(axisX);

    svg.append("g")
        .attr("transform",
            `translate(${marginX + scaleX(0)}, ${marginY})`)
        .call(axisY);

    let lineF = d3.line()
        .x(d => scaleX(d.x))
        .y(d => scaleY(d.y));

    let lineG = d3.line()
        .x(d => scaleX(d.x))
        .y(d => scaleY(d.y));

    let FChart = svg.append("path")
        .datum(FGraph)
        .attr("d", lineF)
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .style("stroke-width", "2")
        .style("stroke", "red")
        .style("fill", "none")

    let YChart = svg.append("path")
        .datum(YGraph)
        .attr("d", lineG)
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .style("stroke-width", "2")
        .style("stroke", "black")
        .style("fill", "none")
});