import FormInput from "../../../components/form/FormInput";

import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";

import ProfilesFormWrapper from "../../../components/form/profilesformWrapper/ProfilesFormWrapper";
import AppButton from "../../../components/Appbutton/AppButton";
import { useUser } from "../../../hook/useUser";
import { updateUserEmail } from "../../../store/actions/User";
import Loading from "../../../components/loading/Loading";
import useAuthContext from "../../../hook/useAuthContext";
import useValidation from "../../../hook/useValidation";

const UpdateEmail = () => {
    const userInfo = useUser();
    const [email, setEmail] = useState(userInfo?.email);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setMessage } = useAuthContext();
    const { error, validate } = useValidation();

    const dispatch = useDispatch();

    const onUpdateEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await dispatch(updateUserEmail(userInfo?.email, email, password));
            setPassword("");
            setMessage({
                text: "You have successfully updated your email",
                type: "success",
            });
        } catch (error) {
            validate(error);
        }
        setLoading(false);
    };

    return (
        <>
            {loading && <Loading />}
            <ProfilesFormWrapper height={175} onSubmit={onUpdateEmail}>
                {error && (
                    <p
                        style={{
                            color: "red",
                            position: "absolute",
                            marginTop: -200,
                        }}
                    >
                        {error}
                    </p>
                )}
                <FormInput
                    Icon={EmailOutlined}
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormInput
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
