import { useState } from "react";
import DrawCube from "./components/DrawCube";

function App() {
    const [color, setColor] = useState("red");

    return (
        <div style={{ padding: "20px" }}>
            <h3>БЕЗ Context</h3>
            <button onClick={() => setColor("red")}>Красный</button>
            <button onClick={() => setColor("blue")}>Синий</button>

            <DrawCube color={color} />
        </div>
    );
}
export default App;