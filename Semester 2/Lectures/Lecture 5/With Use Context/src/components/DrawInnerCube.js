import DrawInnerInnerCube from "./DrawInnerInnerCube";

const DrawInnerCube = () => {
    return (
        <div style={{ border: "2px dashed gray", padding: "30px" }}>
            Средний куб
            <DrawInnerInnerCube />
        </div>
    );
};
export default DrawInnerCube;