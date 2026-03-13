function createPath() {
    const svg = d3.select("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")
    let data = [];
    const r = 100;
    const xOffset = 600;
    const yOffset = 600;

    for (let t = 0; t <= Math.PI * 2; t += 0.01) {
        x_t = 4 * r * Math.cos(t) - r * Math.cos(4 * t);
        y_t = 4 * r * Math.sin(t) - r * Math.sin(4 * t);
        data.push(
            {
                x: y_t + xOffset,
                y: -x_t + yOffset
            }
        );
    }
    return data;
}

const drawPath =() => {
    const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y);
    const svg = d3.select("svg")
    // создаем путь на основе массива точек
    const path = svg.append('path')
        .attr('d', line(createPath()))
        .attr('stroke', 'black') // отображение пути
        .attr('fill', 'none');

    return path;
}

function translateAlong(path, scales, angles) {
    const length = path.getTotalLength();

    return function() {
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            const rotation = angles.angleFrom + (angles.angleTo - angles.angleFrom) * t;
            const momentScaleX = scales.scaleXFrom + (scales.scaleXTo - scales.scaleXFrom) * t;
            const momentScaleY = scales.scaleYFrom + (scales.scaleYTo - scales.scaleYFrom) * t;

            return `translate(${x},${y}) rotate(${rotation}) scale(${momentScaleX}, ${momentScaleY})`;
        }
    }
}