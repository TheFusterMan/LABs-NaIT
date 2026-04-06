import { useState } from "react";

import TableContent from './TableContent.js';
import TableBody from './TableBody.js';

const Table = (props) => {
    const [dataTable, setDataTable] = useState(props.data);
    const updateDataTable = (value) => {
        setDataTable(value);
    }

    return(
        <>
            <table>
                <TableHead head={Object.keys(props.data[0])}/>
                <TableBody
                    body={dataTable}
                />
            </table>
        </>
    )
}

export default Table;