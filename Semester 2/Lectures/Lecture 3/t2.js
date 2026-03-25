document.addEventListener("DOMContentLoaded", function() {
    let svg = d3.select("svg");
    const params = [svg, 20, 50, 50];

    let fst_ship = drawShip(...params);
    let scnd_ship = drawShip(...params);
    let thrd_ship = drawShip(...params);

    fst_ship.attr("transform", "scale(-0.5, 0.5) translate(-700, 250) rotate(-180, 250, 250)");
    scnd_ship.attr("transform", "translate(500, 0) scale(0.5, 1)");
    thrd_ship.attr("transform", "translate(1000, -500) scale(0.5, 1) rotate(-90, 500, 500)");
});