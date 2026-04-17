import { useContext } from "react";
import { ColorContext } from "./ColorContext.js";

const DrawCell = (props) => {
    const color = useContext(ColorContext);

    return (
        <div style={{
            backgroundColor: 'white',
            color: color,
            padding: '10px',
            margin: '0',
        }}>
            {props.text}
        </div>
    )
}

export default DrawCell;