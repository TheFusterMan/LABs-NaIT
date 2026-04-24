import DrawInnerCube from "./DrawInnerCube";

const DrawCube = ({ color }) => {
    return (
        <div style={{ border: "2px solid black", padding: "30px", width: "200px" }}>
            Внешний куб
            <DrawInnerCube color={color} />
        </div>
    );
};
export default DrawCube;