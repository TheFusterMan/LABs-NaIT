import { useState } from "react";

import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from "./Filter.js";

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/
const Table = (props) => {
    const [activePage, setActivePage] = useState("1");
    const changeActive = (event) => setActivePage(event.target.innerHTML);

    const dataTable = props.filteredData;
    const updateDataTable = (value) => props.setFilteredData(value);

    //количество страниц разбиения таблицы
    const n = Math.ceil(dataTable.length / props.amountRows);

    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);

    //формируем совокупность span с номерами страниц
    const pages = arr.map((item, index) =>
        <span
            key={ index }
            onClick={ changeActive }
            className={ "page-num ".concat(item == activePage ? "selected" : "") }
        >
            { item }
        </span>
    );

    return(
        <>
            <h4>Фильтры</h4>
            <Filter
                filtering={updateDataTable}
                data={dataTable}
                fullData={props.data}
            />

            <table>
                <TableHead head={Object.keys(props.data[0])}/>
                <TableBody
                    body={dataTable}
                    amountRows={props.isPaginated == "0" ? props.data.length : props.amountRows}
                    numPage={props.isPaginated == "0" ? "1" : activePage}
                />
            </table>

            <div>
                {props.isPaginated == "0" ? "" : pages}
            </div>
        </>
    )
}

export default Table;