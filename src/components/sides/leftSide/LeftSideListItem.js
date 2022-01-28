import { NavLink } from "react-router-dom";

import "./leftsidelistitem.css";

const LeftSideListItem = ({ title, desc, onClick, Icon, to }) => {
    let activeBackgroundColor = {
        backgroundColor: "#f0f0f0",
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
                    <p className="leftItemText">{title}</p>
                    <p className="leftItemDesc">{desc}</p>
                </div>
            </NavLink>
        </li>
    );
};

export default LeftSideListItem;
