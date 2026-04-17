import { useContext } from "react";
import DrawCell from "./DrawCell.js";
import { ColorContext } from "./ColorContext.js";

const DrawColumn = (props) => {
    const color = useContext(ColorContext);
    const array = props.text.split(". ");

    return (
        <div style={{
            backgroundColor: color,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px'
        }}>
            { array.map((word) => {return <DrawCell text={word}/>}) }
        </div>
    )
}

export default DrawColumn;