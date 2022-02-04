import "./layout.css";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import LeftSide from "../../components/sides/leftSide/LeftSide";

import Menu from "../../components/menu/Menu";
import { useContext } from "react";
import { AuthContext } from "../../components/auth/AuthContext";

const Layout = () => {
    const { dark } = useContext(AuthContext);
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
