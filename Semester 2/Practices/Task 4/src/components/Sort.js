import { useState } from "react";

const Sort = (props) => {
    const keys = Object.keys(props.fullData[0]);
    const allOptions = getOptionsArray(keys);
    const getInitialLevelsState = () => [
        { desc: false, label: 'Первый уровень', selected: 0, options: allOptions },
        { desc: false, label: 'Второй уровень', selected: 0, options: allOptions },
        { desc: false, label: 'Третий уровень', selected: 0, options: allOptions },
    ];
    const [levels, setLevels] = useState(getInitialLevelsState);

    const handleSubmit= (event) => {
        event.preventDefault();
        const sortArr = createSortArr(levels, keys);

        if (sortArr.length === 0){
            return;
        }

        let sortedData = [...props.data].sort((first, second) => {
            for (let { key, direction } of sortArr) {
                const firstValue = first[key];
                const secondValue = second[key];
                let comparison = 0;

                if (key === "Количество" || key === "Цена, руб.") {
                    comparison = parseFloat(firstValue) - parseFloat(secondValue);
                } else {
                    comparison = firstValue.localeCompare(secondValue);
                }

                if (comparison !== 0) {
                    return (direction ? -comparison : comparison);
                }
            }

            return 0;
        });

        props.sorting(sortedData);
    }

    const handleReset= () => {
        setLevels(getInitialLevelsState());
        props.sorting(props.fullData);
    }

    const handleChange= (level_index, value) => {
        setLevels((allLevels) =>
            allLevels.map((level, index) => {
                if (index === level_index) {
                    return { ...level, selected: parseInt(value) }
                }

                if (parseInt(value) === 0 && index > level_index) {
                    return { ...level, selected: 0, desc: false }
                }

                return level;
            })
        );
    }

    const handleCheck= (level_index, value) => {
        setLevels((allLevels) =>
            allLevels.map(
                (level, index) => index === level_index ? { ...level, desc: value } : level
            )
        );
    }

    let sortLevels = levels.map((level, index) => {
        const isDisabled = index > 0 && levels[index - 1].selected === 0;

        return (
            <p>
                <label>{level.label} </label>
                <select
                    value={level.selected}
                    disabled={isDisabled}
                    onChange={(e) => handleChange(index, e.target.value)}
                >
                    {level.options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
                <label> по убыванию? <input
                    type="checkbox"
                    checked={level.desc}
                    onChange={(e) => handleCheck(index, e.target.checked)}
                /></label>
            </p>
        )
    });

    return (
        <form onSubmit={(e) => handleSubmit(e)} onReset={handleReset}>
            {sortLevels}
            <button type="submit">Сортировать</button>
            <button type="reset">Сбросить сортировку</button>
        </form>
    );
}

const getOptionsArray = (options) => {
    let avaliableOptions = [{
        value: 0,
        label: "Нет"
    }];

    options.forEach((item, index) => {
        avaliableOptions.push({
            value: index + 1,
            label: item
        });
    });

    return avaliableOptions;
}

const createSortArr= (levels, keys) => {
    let sortArr = [];

    for (const level of levels) {
        if (level.selected === 0) {
            break;
        }

        sortArr.push({
            key: keys[level.selected - 1],
            direction: level.desc
        });
    }

    return sortArr;
}

export default Sort;