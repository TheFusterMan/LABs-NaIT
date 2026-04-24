import { useState } from "react";

interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
}

interface ComponentProps {
    books: Book[];
}

const TableContent = ({ books }: ComponentProps) => {
    const [dataTable, setDataTable] = useState<Book[]>(books);

    const [latestId, setLatestId] = useState<number>(Math.max(...books.map(item => item.id)));

    const handleDelete = (id: number) : void => {
        setDataTable(dataTable.filter((item : Book) => item.id !== id));
    };

    const handleDuplicate = (item: Book) : void => {
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
            {dataTable.map((item : Book) => (
                <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.price}</td>
                    <td>
                        <button type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDelete(item.id)}>
                            Удалить
                        </button>
                    </td>
                    <td>
                        <button type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDuplicate(item)}>
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