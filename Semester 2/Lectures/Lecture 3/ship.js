function drawShip(svg, scale, offsetX, offsetY) {
    let ship = svg.append("g")
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", 1);

    ship.append("rect")
        .attr("x", 10 * scale + offsetX)
        .attr("y", 1 * scale + offsetY)
        .attr("width", 6 * scale)
        .attr("height", 3 * scale)
        .style("fill", "green");

    const sailPoints = [
        {x: 5, y: 17}, {x: 20, y:14}, {x:10, y:4}
    ].map(d => `${d.x * scale + offsetX},${d.y * scale + offsetY}`).join(" ");
    ship.append("polygon")
        .attr("points", sailPoints)
        .style("fill", "red");

    const downPart = [
        {x: 1, y: 18}, {x: 21, y: 14}, {x: 18, y: 20}, {x: 1, y: 20}, {x: 1, y: 18},
    ];
    let line = d3.line()
        .x(d => d.x * scale + offsetX)
        .y(d => d.y * scale + offsetY)
    ship.append("path")
        .attr("d", line(downPart))
        .style("fill", "grey");

    ship.append("circle")
        .attr("cx", 17 * scale + offsetX)
        .attr("cy", 17 * scale + offsetY)
        .attr("r", 1.1 * scale)
        .style("fill", "blue");

    return ship;
}