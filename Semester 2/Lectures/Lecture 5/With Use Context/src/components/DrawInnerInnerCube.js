import { useContext } from "react";
import { ColorContext } from "./ColorContext";

const DrawInnerInnerCube = () => {
    const color = useContext(ColorContext);

    return (
        <div style={{ backgroundColor: color, height: "50px", color: "white", padding: "10px" }}>
            Самый внутренний куб
        </div>
    );
};
export default DrawInnerInnerCube;