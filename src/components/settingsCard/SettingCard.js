import "./settingscard.css";
import { Link, useLocation } from "react-router-dom";

import useAuthContext from "../../hook/useAuthContext";
const SettingCard = ({ Icon, title, desc, path }) => {
    const { pathname } = useLocation();
    const { dark } = useAuthContext();

    return (
        <Link
            style={{ backgroundColor: dark ? "#333" : "#fff" }}
            to={`${pathname}/${path}`}
            className="settingCard"
        >
            <div className="settingIconContainer">
                <Icon className="settingsIcon" />
            </div>
            <div className="settingsItems">
                <p
                    style={{ color: dark ? "#fff" : "#000" }}
                    className="settingsItem"
                >
                    {title}
                </p>
                <p
                    style={{ color: dark ? "#ccc" : "gray" }}
                    className="settingsDesc"
                >
                    {desc}
                </p>
            </div>
        </Link>
    );
};

export default SettingCard;
