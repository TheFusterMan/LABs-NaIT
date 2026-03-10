
const drawSmile = (svg) => {
    const smile = svg.append("g");

    smile.append("rect")
        .attr("x", -50)
        .attr("y", -140)
        .attr("width", 100)
        .attr("height", 100)
        .attr("fill", "black")
        .attr("rx", 15)
        .attr("ry", 15);

    smile.append("rect")
        .attr("x", -50)
        .attr("y", -60)
        .attr("width", 100)
        .attr("height", 15)
        .attr("fill", "white");

    smile.append("polygon")
        .attr("points", "-80,-40 80,-40 0,0")
        .attr("fill", "black")
        .attr("stroke", "black")
        .attr("stroke-width", "10")
        .attr("stroke-linejoin", "round");

    smile.append("circle")
        .attr("cx", 0)
        .attr("cy", 20)
        .attr("r", 60)
        .attr("fill", "black");

    const eyesArc = d3.arc()
        .innerRadius(10)
        .outerRadius(20)
        .startAngle(Math.PI / 2)
        .endAngle(Math.PI + 1);


    smile.append("path")
        .attr("d", eyesArc())
        .attr("fill", "white")
        .attr("transform", "translate(25, 20) scale(1, 0.4) rotate(-20)");

    smile.append("path")
        .attr("d", eyesArc())
        .attr("fill", "white")
        .attr("transform", "translate(-25, 20) scale(-1, 0.4) rotate(-20)");

    const mouthArc = d3.arc()
        .innerRadius(10)
        .outerRadius(15)
        .startAngle(Math.PI * 1.5 / 2)
        .endAngle(Math.PI * 2.5 / 2);

    smile.append("path")
        .attr("d", mouthArc())
        .attr("fill", "white")
        .attr("transform", "translate(0, 45) scale(3, 0.5)");

    return smile;
}