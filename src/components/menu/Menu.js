import "./menu.css";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";

import SharedMenu from "../sharedmenu/SharedMenu";
import { AuthContext } from "../auth/AuthContext";

import { useUser } from "../../hook/useUser";

const Menu = () => {
    const { isMenuOpen, setIsMenuOpen } = useContext(AuthContext);
    const userInfo = useUser();

    const closeMenu = (e) => {
        if (e.target.className === "menu") {
            setIsMenuOpen(false);
        }
    };

    return (
        <div
            style={{ width: isMenuOpen ? "100%" : "0%" }}
            className="menu"
            onClick={(e) => closeMenu(e)}
        >
            <div
                style={{ width: isMenuOpen ? 300 : 0 }}
                className="menuContainer"
            >
                {isMenuOpen && (
                    <div
                        className="menuCloseIconContainer"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <IoClose className="menuCloseIcon" />
                    </div>
                )}
                <SharedMenu userInfo={userInfo} />
            </div>
        </div>
    );
};

export default Menu;
