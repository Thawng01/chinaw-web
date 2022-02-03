import "./layout.css";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import LeftSide from "../../components/sides/leftSide/LeftSide";

import Menu from "../../components/menu/Menu";

const Layout = () => {
    return (
        <div className="layout">
            <LeftSide />
            <Menu />
            <div className="layoutContainer">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
