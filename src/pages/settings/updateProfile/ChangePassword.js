import ProfilesFormWrapper from "../../../components/profileform/profilesformWrapper/ProfilesFormWrapper";
import { LockOutlined } from "@mui/icons-material";
import ProfileFormInput from "../../../components/profileform/ProfileFormInput";
import AppButton from "../../../components/Appbutton/AppButton";
const ChangePassword = () => {
    return (
        <ProfilesFormWrapper height={240}>
            <ProfileFormInput
                Icon={LockOutlined}
                type="password"
                placeholder="Current password"
            />
            <ProfileFormInput
                Icon={LockOutlined}
                type="password"
                placeholder="New password"
            />
            <ProfileFormInput
                Icon={LockOutlined}
                type="password"
                placeholder="Repeat new password"
            />

            <AppButton title="Change password" />
        </ProfilesFormWrapper>
    );
};

export default ChangePassword;
