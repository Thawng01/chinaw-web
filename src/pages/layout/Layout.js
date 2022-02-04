import "./layout.css";
import { Outlet } from "react-router-dom";
import LeftSide from "../../components/sides/leftSide/LeftSide";

import Menu from "../../components/menu/Menu";
import useAuthContext from "../../hook/useAuthContext";

const Layout = () => {
    const { dark } = useAuthContext();
    return (
        <div
            style={{
                backgroundColor: dark ? "#000" : "#fff",
                color: dark ? "#fff" : "#000",
            }}
            className="layout"
        >
            <LeftSide />
            <Menu />
            <div className="layoutContainer">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
