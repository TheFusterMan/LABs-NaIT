import Table from "../../Practices/Task 4/src/components/Table";

const InfoNumber = (proprs) => {
    const quantityNums = proprs.value.length;
    const numVal = Number(proprs.value);
    const root = Math.sqrt(numVal);
    const isFullSquare = Number.isInteger(root);

    return (
        <>
            <p>Число {numVal}:</p>
            <ul>
                <li>количество цифр - {quantityNums}</li>
                <li>число {numVal % 2 ? "нечетное" : "четное"}</li>
                { isFullSquare ? <li>полный квадрат числа {root}</li> : {} }
            </ul>
        </>
    )
}

export default InfoNumber;