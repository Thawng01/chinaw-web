import "./rightSide.css";
import useAuthContext from "../../../hook/useAuthContext";

const RightSide = () => {
    const { dark } = useAuthContext();
    return (
        <div
            style={{ backgroundColor: dark ? "#333" : "azure" }}
            className="right"
        >
            <h3 className="ad">Advertisement</h3>
        </div>
    );
};

export default RightSide;
