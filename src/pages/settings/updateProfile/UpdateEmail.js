import ProfileFormInput from "../../../components/profileform/ProfileFormInput";

import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";

import ProfilesFormWrapper from "../../../components/profileform/profilesformWrapper/ProfilesFormWrapper";
import AppButton from "../../../components/Appbutton/AppButton";
import { useUser } from "../../../hook/useUser";
import { updateUserEmail } from "../../../store/actions/User";
import Loading from "../../../components/loading/Loading";
import Message from "../../../components/message/Message";
import useAuthContext from "../../../hook/useAuthContext";

const UpdateEmail = () => {
    const userInfo = useUser();
    const [email, setEmail] = useState(userInfo?.email);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { message, setMessage } = useAuthContext();

    const dispatch = useDispatch();

    const onUpdateEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await dispatch(updateUserEmail(userInfo?.email, email, password));
            setPassword("");
            setMessage("You have successfully updated your email");
        } catch (error) {
            setMessage(error.message);
        }
        setLoading(false);
    };

    return (
        <>
            {message && <Message message={message} />}
            {loading && <Loading title="Updating..." />}
            <ProfilesFormWrapper height={190} onSubmit={onUpdateEmail}>
                <ProfileFormInput
                    Icon={EmailOutlined}
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <ProfileFormInput
                    Icon={LockOutlined}
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <AppButton title="Update email" />
            </ProfilesFormWrapper>
        </>
    );
};

export default UpdateEmail;
