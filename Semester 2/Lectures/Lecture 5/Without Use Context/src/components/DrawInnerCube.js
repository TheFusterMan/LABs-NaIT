import DrawInnerInnerCube from "./DrawInnerInnerCube";

const DrawInnerCube = ({ color }) => {
    return (
        <div style={{ border: "2px dashed gray", padding: "30px" }}>
            Средний куб
            <DrawInnerInnerCube color={color} />
        </div>
    );
};
export default DrawInnerCube;