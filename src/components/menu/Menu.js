import "./menu.css";
import { IoClose } from "react-icons/io5";

import SharedMenu from "../sharedmenu/SharedMenu";
import { useUser } from "../../hook/useUser";
import useAuthContext from "../../hook/useAuthContext";
import ThemeToggle from "../themeToggle/ThemeToggle";

const Menu = () => {
    const { isMenuOpen, setIsMenuOpen, dark } = useAuthContext();
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
                style={{
                    width: isMenuOpen ? 300 : 0,
                    backgroundColor: dark ? "#333" : "#f0f0f0",
                }}
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
