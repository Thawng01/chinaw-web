import { NavLink } from "react-router-dom";

import useAuthContext from "../../../hook/useAuthContext";
import "./leftsidelistitem.css";

const LeftSideListItem = ({ title, desc, onClick, Icon, to }) => {
    const { dark } = useAuthContext();

    let activeBackgroundColor = {
        backgroundColor: dark ? "#000" : "#fff",
    };

    return (
        <li className="leftItem" onClick={onClick}>
            <NavLink
                to={to}
                className="leftLink"
                style={({ isActive }) =>
                    isActive ? activeBackgroundColor : undefined
                }
            >
                <Icon className="leftIcon" />
                <div className="leftItemTextContainer">
                    <p
                        style={{ color: dark ? "#fff" : "#000" }}
                        className="leftItemText"
                    >
                        {title}
                    </p>
                    <p
                        style={{ color: dark ? "#ccc" : "gray" }}
                        className="leftItemDesc"
                    >
                        {desc}
                    </p>
                </div>
            </NavLink>
        </li>
    );
};

export default LeftSideListItem;
