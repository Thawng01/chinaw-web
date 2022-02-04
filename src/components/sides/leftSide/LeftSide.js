import SharedMenu from "../../sharedmenu/SharedMenu";
import "./leftSide.css";
import { useUser } from "../../../hook/useUser";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

const LeftSide = () => {
    const { dark } = useContext(AuthContext);
    const userInfo = useUser();
    return (
        <div
            style={{ backgroundColor: dark ? "#333" : "#f0f0f0" }}
            className="left"
        >
            <SharedMenu userInfo={userInfo} />
        </div>
    );
};

export default LeftSide;
