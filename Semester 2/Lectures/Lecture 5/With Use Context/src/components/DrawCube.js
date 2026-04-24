import DrawInnerCube from "./DrawInnerCube";

const DrawCube = () => {
    return (
        <div style={{ border: "2px solid black", padding: "30px", width: "200px" }}>
            Внешний куб
            <DrawInnerCube />
        </div>
    );
};
export default DrawCube;