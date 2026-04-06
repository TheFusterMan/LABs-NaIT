import * as d3 from "d3";
import { useState } from "react";
import ChartDraw from './ChartDraw.js';

const Chart = (props) => {
    const [ox, setOx] = useState("Страна");
    const [oy, setOy] = useState([true, false])
    const [type, setType] = useState("Точечная");
    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const oySelections = [event.target["oy"][0].checked, event.target["oy"][1].checked];

        if (oySelections.filter((item) => item).length === 0) {
            setError(true);
            return;
        }

        setOx(event.target["ox"].value);
        setOy(oySelections);
        setType(event.target["type"].value);
    }

    const createArrGraph =(data, key)=>{
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Высота']));
            arrGraph.push({labelX: entry[0], values: [minMax[1], minMax[0]]});
        }

        if (key === "Год") {
            arrGraph.sort((a, b) => a.labelX <= b.labelX ? -1 : 1);
        }

        return arrGraph;
    }
    return (
        <>
            <h4>Визуализация</h4>
            <form onSubmit={handleSubmit}>
                <p> Значение по оси OX: </p>
                <div>
                    <input type="radio" name="ox" value="Страна" defaultChecked={ox === "Страна"}/>
                    Страна
                    <br/>
                    <input type="radio" name="ox" value="Год"/>
                    Год
                </div>

                <p> Значение по оси OY </p>
                <div>
                    <input
                        type="checkbox"
                        onChange={() => setError(false)}
                        name="oy"
                        style={ error ? { outline: "2px solid red" } : {} }
                        defaultChecked={oy[0] === true}
                    />
                    Максимальная высота <br/>
                    <input
                        type="checkbox"
                        onChange={() => setError(false)}
                        name="oy"
                        style={ error ? { outline: "2px solid red" } : {} }
                    />
                    Минимальная высота
                </div>

                <p> Тип диаграммы
                    <select name="type">
                        <option value="Точечная">Точечная диаграмма</option>
                        <option value="Гистограмма">Гистограмма</option>
                    </select>
                </p>

                <p>
                    <button type="submit">Построить</button>
                </p>
            </form>
            { error ? "" : <ChartDraw data={ createArrGraph(props.data, ox) } oySwitches={oy} type={type}/>}
        </>
    )
}

export default Chart;