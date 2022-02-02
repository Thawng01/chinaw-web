import ProfilesFormWrapper from "../../../components/profileform/profilesformWrapper/ProfilesFormWrapper";
import { LockOutlined } from "@mui/icons-material";
import ProfileFormInput from "../../../components/profileform/ProfileFormInput";
import AppButton from "../../../components/Appbutton/AppButton";
import { useContext, useState } from "react";
import { AuthContext } from "../../../components/auth/AuthContext";
import { useDispatch } from "react-redux";
import { updateUserPassword } from "../../../store/actions/User";
import Loading from "../../../components/loading/Loading";
import Message from "../../../components/message/Message";

const ChangePassword = () => {
    const [currentP, setCurrentp] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { message, setMessage } = useContext(AuthContext);

    const dispatch = useDispatch();

    async function onUpdatePassword(e) {
        e.preventDefault();
        if (!currentP || !password || !cPassword)
            return setMessage("Please fill the required field");

        if (password !== cPassword)
            return setMessage("Passwords are not matching");

        setLoading(true);
        try {
            await dispatch(updateUserPassword(currentP, password));
            setCurrentp("");
            setPassword("");
            setCpassword("");
            setMessage("You have successfully changed your password");
        } catch (error) {
            setMessage(error.message);
        }

        setLoading(false);
    }

    return (
        <>
            {loading && <Loading title="Changing your password..." />}
            {message && <Message />}
            <ProfilesFormWrapper height={240} onSubmit={onUpdatePassword}>
                <ProfileFormInput
                    Icon={LockOutlined}
                    type="password"
                    placeholder="Current password"
                    value={currentP}
                    onChange={(e) => setCurrentp(e.target.value)}
                />
                <ProfileFormInput
                    Icon={LockOutlined}
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ProfileFormInput
                    Icon={LockOutlined}
                    type="password"
                    placeholder="Repeat new password"
                    value={cPassword}
                    onChange={(e) => setCpassword(e.target.value)}
                />

                <AppButton title="Change password" />
            </ProfilesFormWrapper>
        </>
    );
};

export default ChangePassword;
