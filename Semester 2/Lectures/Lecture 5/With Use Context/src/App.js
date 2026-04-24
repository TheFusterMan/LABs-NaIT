import { useState } from "react";
import DrawCube from "./components/DrawCube";
import { ColorContext } from "./components/ColorContext";

function App() {
    const [color, setColor] = useState("red");

    return (
        <div style={{ padding: "20px" }}>
            <h3>С использованием Context</h3>
            <button onClick={() => setColor("red")}>Красный</button>
            <button onClick={() => setColor("blue")}>Синий</button>

            <ColorContext.Provider value={color}>
                <DrawCube />
            </ColorContext.Provider>
        </div>
    );
}
export default App;
