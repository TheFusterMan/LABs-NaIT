import { useState } from "react";

const TableContent = (props) => {
    const [dataTable, setDataTable] = useState(props.books);

    const [latestId, setLatestId] = useState(Math.max(...props.books.map(item => item.id)));

    const handleDelete = (id) => {
        setDataTable(dataTable.filter((item) => item.id !== id));
    };

    const handleDuplicate = (item) => {
        const newId = latestId + 1;
        setLatestId(newId);
        setDataTable([...dataTable, {...item, id: newId}]);
    };

    return (
        <table>
            <thead>
            <tr>
                <th>title</th>
                <th>author</th>
                <th>price</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {dataTable.map((item) => (
                <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.price}</td>
                    <td>
                        <button onClick={() => handleDelete(item.id)}>
                            Удалить
                        </button>
                    </td>
                    <td>
                        <button onClick={() => handleDuplicate(item)}>
                            Дублировать
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableContent;