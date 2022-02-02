import "./settingscard.css";
import { Link, useLocation } from "react-router-dom";

const SettingCard = ({ Icon, title, desc, path }) => {
    const { pathname } = useLocation();

    return (
        <Link to={`${pathname}/${path}`} className="settingCard">
            <div className="settingIconContainer">
                <Icon className="settingsIcon" />
            </div>
            <div className="settingsItems">
                <p className="settingsItem">{title}</p>
                <p className="settingsDesc">{desc}</p>
            </div>
        </Link>
    );
};

export default SettingCard;
