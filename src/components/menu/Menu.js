import "./menu.css";
import { useContext } from "react";

import SharedMenu from "../sharedmenu/SharedMenu";
import { AuthContext } from "../auth/AuthContext";

import { useUser } from "../../hook/useUser";

const Menu = () => {
    const { isMenuOpen } = useContext(AuthContext);
    const userInfo = useUser();
    return (
        <div
            className="menu"
            style={{
                display: isMenuOpen ? "block" : "none",
                width: "100%",
            }}
        >
            <SharedMenu userInfo={userInfo} />
        </div>
    );
};

export default Menu;
