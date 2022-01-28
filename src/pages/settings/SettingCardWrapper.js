import SettingCard from "../../components/settingsCard/SettingCard";
import {
    BookmarkAddedOutlined,
    EmailOutlined,
    History,
    LockOutlined,
    PersonOutline,
} from "@mui/icons-material";
import "./settingCardWrapper.css";

const SettingRoutes = () => {
    return (
        <div className="settingCardContainer">
            <SettingCard
                Icon={PersonOutline}
                title="Update your profile"
                desc="You may update your username, bio and photo"
                path="update_profile"
            />

            <SettingCard
                Icon={EmailOutlined}
                title="Update email"
                desc="You may update your email"
                path="update_email"
            />

            <SettingCard
                Icon={LockOutlined}
                title="Change password"
                desc="You may change your password"
                path="change_password"
            />

            <SettingCard
                Icon={BookmarkAddedOutlined}
                title="Saved"
                desc="View your saved posts"
                path="saved_post"
            />
            <SettingCard
                Icon={History}
                title="History"
                desc="View your payment history"
                path="history"
            />
        </div>
    );
};

export default SettingRoutes;
