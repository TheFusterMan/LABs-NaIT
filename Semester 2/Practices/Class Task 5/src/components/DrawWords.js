import { useState } from "react";
import DrawColumn from "./DrawColumn.js";
import { ColorContext } from "./ColorContext.js";

const DrawWords = (props) => {
    const [inputValue, setInputValue] = useState("green");
    const [appliedColor, setAppliedColor] = useState("green");

    const handleColorChange = () => {
        setAppliedColor(inputValue);
    };

    return (
        <div>
            <label>Цвет: </label>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleColorChange}>Изменить</button>

            <ColorContext.Provider value={appliedColor}>
                <div style={{ display: 'flex', gap: '70px', alignItems: 'flex-start' }}>
                    { props.data.map((str) => (<DrawColumn text={str} />)) }
                </div>
            </ColorContext.Provider>
        </div>


)
}

export default DrawWords;