/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
    const handleSubmit= (event) => {
        event.preventDefault();

        // создаем словарь со значениями полей формы
        const filterField = {
            "Название животного": event.target["animal_name"].value.toLowerCase(),
            "Категория": event.target["category"].value.toLowerCase(),
            "Порода": event.target["breed"].value.toLowerCase(),
            "Наличие": event.target["stock"].value.toLowerCase(),
            "Количество": [event.target["quantity_from"].value, event.target["quantity_to"].value],
            "Цена, руб.": [event.target["price_from"].value, event.target["price_to"].value]
        };

        const filterNums= (num, min, max) => {
            if (min === "") {
                min = -Infinity;
            }
            if (max === "") {
                max = Infinity
            }

            num = Number(num);
            min = Number(min);
            max = Number(max);

            return num >= min && num <= max;
        }

        //фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        for(const key in filterField) {
            arr = arr.filter(item =>
                ["Количество", "Цена, руб."].includes(key)
                    ? filterNums(item[key], filterField[key][0], filterField[key][1])
                    : item[key].toLowerCase().includes(filterField[key])
            );
        }

        //передаем родительскому компоненту новое состояние - отфильтрованный массив
        props.filtering(arr);
    }

    const handleReset= (event) => {
        props.filtering(props.fullData);
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <p>
                <label>Название животного:</label>
                <input name="animal_name" type="text"/>
            </p>
            <p>
                <label>Категория:</label>
                <input name="category" type="text"/>
            </p>
            <p>
                <label>Порода:</label>
                <input name="breed" type="text"/>
            </p>
            <p>
                <label>Наличие:</label>
                <input name="stock" type="text"/>
            </p>
            <p>
                <label>Количество от:</label>
                <input name="quantity_from" type="number"/>
            </p>
            <p>
                <label>Количество до:</label>
                <input name="quantity_to" type="number"/>
            </p>
            <p>
                <label>Цена от:</label>
                <input name="price_from" type="number"/>
            </p>
            <p>
                <label>Цена до:</label>
                <input name="price_to" type="number"/>
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Очистить фильтр</button>
            </p>
        </form>
    )
}

export default Filter;