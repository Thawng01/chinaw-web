import { useDispatch } from "react-redux";
import { useState } from "react";

import ProfilesFormWrapper from "../../../components/form/profilesformWrapper/ProfilesFormWrapper";
import { LockOutlined } from "@mui/icons-material";
import FormInput from "../../../components/form/FormInput";
import AppButton from "../../../components/Appbutton/AppButton";
import { updateUserPassword } from "../../../store/actions/User";
import Loading from "../../../components/loading/Loading";
import useAuthContext from "../../../hook/useAuthContext";
import useValidation from "../../../hook/useValidation";

const ChangePassword = () => {
    const [currentP, setCurrentp] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setMessage } = useAuthContext();
    const { error, validate, setError } = useValidation();

    const dispatch = useDispatch();

    async function onUpdatePassword(e) {
        e.preventDefault();
        if (!currentP || !password || !cPassword)
            return setError("Please fill the required field");

        if (password !== cPassword)
            return setError("Passwords are not matching");

        setLoading(true);
        try {
            await dispatch(updateUserPassword(currentP, password));
            setCurrentp("");
            setPassword("");
            setCpassword("");
            setMessage({
                text: "You have successfully changed your password",
                type: "success",
            });
            setError(null);
        } catch (error) {
            validate(error);
        }

        setLoading(false);
    }

    return (
        <>
            {loading && <Loading />}

            <ProfilesFormWrapper height={230} onSubmit={onUpdatePassword}>
                {error && (
                    <p
                        style={{
                            color: "red",
                            position: "absolute",
                            marginTop: -250,
                        }}
                    >
                        {error}
                    </p>
                )}
                <FormInput
                    Icon={LockOutlined}
                    type="password"
                    placeholder="Current password"
                    value={currentP}
                    onChange={(e) => setCurrentp(e.target.value)}
                />
                <FormInput
                    Icon={LockOutlined}
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FormInput
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
