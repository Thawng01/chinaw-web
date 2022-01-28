import SharedMenu from "../../sharedmenu/SharedMenu";
import "./leftSide.css";
import { useUser } from "../../../hook/useUser";

const LeftSide = () => {
    const userInfo = useUser();
    return (
        <div className="left">
            <SharedMenu userInfo={userInfo} />
        </div>
    );
};

export default LeftSide;
