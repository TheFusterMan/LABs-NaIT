document.addEventListener("DOMContentLoaded", function() {
    const width = 1920;
    const height = 800;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height) ;

    const settingForm = document.getElementById("setting");

    const animateButton = d3.select('input[value="Анимировать"]');
    animateButton.on('click', () => runAnimation());
    const clearButton = d3.select('input[value="Очистить"]');
    clearButton.on('click', () => clear(svg));
});

const clear = (svg) => {
    svg.selectAll('*').remove();
}

const runAnimation = () => {
    const svg = d3.select("svg")
    clear(svg);

    let pict = drawCircle(svg, false);

    const halfWidth = svg.attr("width") / 2;
    const halfHeight = svg.attr("height") / 2;

    pict.attr("transform", `translate(${halfWidth},${halfHeight}) scale(${1}, ${1})`)
        .attr("opacity", 1)
        .transition()
        .duration(3000)
        .attr("transform", `translate(${halfWidth},${halfHeight}) scale(${10}, ${10})`)
        .attr("opacity", 0)
        .on("end", () => splitCircle(svg, halfWidth, halfHeight));
}

const splitCircle = (svg, halfWidth, halfHeight) => {
    clear(svg);
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < 10; i++) {
        let circle = drawCircle(svg, true);

        let x = getRandomNumber(halfWidth - 150, halfWidth + 150);
        let y = getRandomNumber(halfHeight - 150, halfHeight + 150);

        circle.attr("transform", `translate(${x},${y})`);
    }
}