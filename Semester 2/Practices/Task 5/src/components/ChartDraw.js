import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    // заносим в состояния ширину и высоту svg-элемента
    useEffect(() => {
        const svg = d3.select(chartRef.current);
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    });
    // задаем отступы в svg-элементе
    const  margin = {
        top:10,
        bottom:60,
        left:40,
        right:10
    };

    // вычисляем ширину и высоту области для вывода графиков
    const boundsWidth = width -  margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        // выводим прямоугольник,
        svg
            .append("rect")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .attr("width",  boundsWidth)
            .attr("height",  boundsWidth)
            .style("fill", "lightgrey");
    });

    const selectedOptions = [
        { key: 'max', valueIndex: 1, color: 'red', isChecked: props.results[0] },
        { key: 'avg', valueIndex: 2, color: 'yellow', isChecked: props.results[1] },
        { key: 'min', valueIndex: 0, color: 'blue', isChecked: props.results[2] }
    ].filter(result => result.isChecked);

    let dataToExtent = [];
    selectedOptions.forEach(result => {
        dataToExtent.push(...props.data.map(d => d.values[result.valueIndex]));
    });
    let [min, max] = d3.extent(dataToExtent);

    // формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
    }, [props.data, boundsWidth]);

    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([min * 0.85, max * 1.1 ])
            .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);


    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

        //рисуем график
        selectedOptions.forEach((option) => {
            if (props.type === "Точечная") {
                let radius = 4;
                const getYOffset = (d, key) => {
                    if (d.values[0] === d.values[1] && key !== "avg") {
                        return key === "max" ? -radius : radius;
                    }
                    return 0;
                };

                svg .selectAll(".dot")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", radius)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[option.valueIndex]) + getYOffset(d, option.key, radius) )
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", option.color)
            }
            else if (props.type === "Гистограмма") {
                const width = 6;
                const getXOffset = (key) => {
                    return key !== "avg" ? (key === "max" ? -width : width) : 0;
                };

                svg .selectAll(".bar")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 - getXOffset(option.key))
                    .attr("y", d => scaleY(d.values[option.valueIndex]) + margin.top)
                    .attr("width", width)
                    .attr("height", d => boundsHeight - scaleY(d.values[option.valueIndex]))
                    .style("fill", option.color)
            }
            else if (props.type === "График") {
                let radius = 4;
                const getYOffset = (d, key) => {
                    if (d.values[0] === d.values[1] && key !== "avg") {
                        return key === "max" ? -radius : radius;
                    }
                    return 0;
                };

                const line = d3.line()
                    .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .y(d => scaleY(d.values[option.valueIndex]) + getYOffset(d, option.key))
                    .curve(d3.curveMonotoneX);

                svg.append("path")
                    .datum(props.data)
                    .attr("d", line)
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("stroke-width", 2)
                    .style("stroke", option.color)
                    .style("fill", "none");
            }
        });
    }, [scaleX, scaleY, props.data, props.type]);

    return (
        <svg ref={ chartRef }>  </svg>
    )
}

export default ChartDraw;