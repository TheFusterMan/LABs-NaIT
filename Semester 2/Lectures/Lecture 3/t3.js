document.addEventListener("DOMContentLoaded", function() {
    let svg = d3.select("svg");
    let ship = drawShip(svg, 20, 50, 50);

    ship.attr("transform", `translate(-400, 0)`);
    rightRide(ship);
});

function rightRide(ship) {
    ship.attr("transform", `translate(-500, 0) scale(1, 1)`);

    ship.transition()
        .duration(3000)
        .attr("transform", `translate(800, 0) scale(1, 1)`)
        .on("end", () => {
            leftRide(ship);
        });
}

function leftRide(ship) {
    ship.attr("transform", `translate(1300, 0) scale(-1, 1)`);

    ship.transition()
        .duration(3000)
        .attr("transform", `translate(0, 0) scale(-1, 1)`)
        .on("end", () => {
            rightRide(ship);
        });
}