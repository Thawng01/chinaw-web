import ProfileFormInput from "../../../components/profileform/ProfileFormInput";

import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import ProfilesFormWrapper from "../../../components/profileform/profilesformWrapper/ProfilesFormWrapper";
import AppButton from "../../../components/Appbutton/AppButton";

const UpdateEmail = () => {
    return (
        <ProfilesFormWrapper height={190}>
            <ProfileFormInput
                Icon={EmailOutlined}
                type="email"
                placeholder="Enter your Email"
            />
            <ProfileFormInput
                Icon={LockOutlined}
                type="password"
                placeholder="Enter your password"
            />
            <AppButton title="Update email" />
        </ProfilesFormWrapper>
    );
};

export default UpdateEmail;
