import "./layout.css";
import { Outlet } from "react-router-dom";

import LeftSide from "../../components/sides/leftSide/LeftSide";
import Menu from "../../components/menu/Menu";
import Message from "../../components/message/Message";

const Layout = () => {
    return (
        <div className="layout">
            <Message />
            <LeftSide />
            <Menu />
            <div className="layoutContainer">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
