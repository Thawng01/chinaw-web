import { Route, Routes } from "react-router-dom";

import "./settings.css";
import SettingCardWrapper from "./SettingCardWrapper";
import UpdateProfile from "../settings/updateProfile/UpdateProfile";
import UpdateEmail from "../settings/updateProfile/UpdateEmail";
import ChangePassword from "../settings/updateProfile/ChangePassword";
import PaymentHistory from "../history/PaymentHistory";
import NoPage from "../nopage/NoPage";
import Saved from "./saved/Saved";

const Settings = () => {
    return (
        <div className="settingsContainer">
            <Routes>
                <Route path="/" element={<SettingCardWrapper />} />
                <Route path={`/update_profile`} element={<UpdateProfile />} />
                <Route path={`/update_email`} element={<UpdateEmail />} />
                <Route path={`/change_password`} element={<ChangePassword />} />
                <Route path={`/update_profile`} element={<UpdateProfile />} />
                <Route path={`/history`} element={<PaymentHistory />} />
                <Route path={`/saved_post`} element={<Saved />} />

                <Route path="*" element={<NoPage />} />
            </Routes>
        </div>
    );
};

export default Settings;
