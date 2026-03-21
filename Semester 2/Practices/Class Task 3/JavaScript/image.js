// создаем изображение смайлик
// рисуем его относительно точки (0, 0)
function drawCircle(svg, isEmptyInside) {
    const width = svg.attr("width");
    const height = svg.attr("height");

    let circle = svg.append("circle")
        .attr("cx", 1)
        .attr("cy", 1)
        .attr("r", 15)
        .style("fill", isEmptyInside ? "none" : "blue")
        .style("stroke", isEmptyInside? "blue" : "none")

    return circle;
}