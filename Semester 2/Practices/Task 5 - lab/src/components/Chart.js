import * as d3 from "d3";
import { useState } from "react";
import ChartDraw from './ChartDraw.js';

const Chart = (props) => {
    const [ox, setOx] = useState("Категория");
    const [oy, setOy] = useState("Количество");
    const [type, setType] = useState("Точечная");
    const [results, setResults] = useState([true, false, false]); //макс, среднее, мин
    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const resultsSelections = [
            event.target["max"].checked,
            event.target["avg"].checked,
            event.target["min"].checked,
        ];

        if (resultsSelections.filter((item) => item).length === 0) {
            setError(true);
            return;
        }

        setOx(event.target["ox"].value);
        setOy(event.target["oy"].value);
        setType(event.target["type"].value);
        setResults(resultsSelections);
    }

    const createArrGraph =(data, keyX, keyY)=>{
        const groupObj = d3.group(data, d => d[keyX]);
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d[keyY]));
            arrGraph.push({
                labelX: entry[0],
                values: [
                    minMax[0],
                    minMax[1],
                    (minMax[0] + minMax[1]) / 2
                ]
            });
        }

        return arrGraph;
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <p> Значение по оси OX: </p>
                <div>
                    <input type="radio" name="ox" value="Категория" defaultChecked={ox === "Категория"}/>
                    Категория
                    <br/>
                    <input type="radio" name="ox" value="Порода"/>
                    Порода
                </div>

                <p> Значение по оси OY </p>
                <div>
                    <input
                        type="radio"
                        name="oy"
                        value="Количество"
                        defaultChecked={oy === "Количество"}
                    />
                    Количество <br/>
                    <input
                        type="radio"
                        name="oy"
                        value="Цена, руб."
                    />
                    Цена
                </div>

                <p> Тип диаграммы
                    <select name="type">
                        <option value="Точечная">Точечная диаграмма</option>
                        <option value="Гистограмма">Столбчатая диаграмма</option>
                        <option value="График">График</option>
                    </select>
                </p>

                <p> Результат
                    <label>
                        <input type="checkbox" name="max" defaultChecked={results[0]}/>
                        Максимальное значение
                    </label>
                    <br/>
                    <label>
                        <input type="checkbox" name="avg"/>
                        Среднее значение
                    </label>
                    <br/>
                    <label>
                        <input type="checkbox" name="min"/>
                        Минимальное значение
                    </label>
                    <br/>
                </p>

                <p>
                    <button type="submit">Построить</button>
                </p>
            </form>
            { !error && <ChartDraw data={createArrGraph(props.data, ox, oy) } results={results} type={type}/>}
        </>
    )
}

export default Chart;