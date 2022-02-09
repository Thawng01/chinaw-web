import { EditOutlined, PersonOutline } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import "./updateprofile.css";
import { useUser } from "../../../hook/useUser";
import AppButton from "../../../components/Appbutton/AppButton";
import FormInput from "../../../components/form/FormInput";
import ProfilesFormWrapper from "../../../components/form/profilesformWrapper/ProfilesFormWrapper";
import { updateUserProfile } from "../../../store/actions/User";
import Loading from "../../../components/loading/Loading";
import useAuthContext from "../../../hook/useAuthContext";

const UpdateProfile = () => {
    const { setMessage } = useAuthContext();

    const userInfo = useUser();
    const [userImage, setUserImage] = useState({ src: userInfo?.image });
    const [username, setUsername] = useState(userInfo?.username);
    const [bio, setBio] = useState(userInfo?.bio);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    const dispatch = useDispatch();

    const updateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await dispatch(
                updateUserProfile(username, userImage, bio, userInfo?.uid)
            );

            setMessage({
                text: "You have successfully updated your profile",
                type: "success",
            });
        } catch (error) {
            setMessage({ text: error.message, type: "error" });
        }

        setLoading(false);
    };

    const selectProfileImg = () => {
        inputRef?.current?.click();
    };

    const onChangeProfileImg = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUserImage({
                src: URL.createObjectURL(e.target.files[0]),
                file: e.target.files[0],
            });
        }
    };

    return (
        <>
            {loading && <Loading />}
            <ProfilesFormWrapper height={280} onSubmit={updateProfile}>
                <img src={userImage?.src} alt="" className="profileUpdateImg" />
                <input
                    type="file"
                    ref={inputRef}
                    onChange={onChangeProfileImg}
                    style={{ display: "none" }}
                />
                <p className="profimeImgUpdateBtn" onClick={selectProfileImg}>
                    Change photo
                </p>

                <FormInput
                    Icon={PersonOutline}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <FormInput
                    Icon={EditOutlined}
                    type="text"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />

                <AppButton title="Update" />
            </ProfilesFormWrapper>
        </>
    );
};

export default UpdateProfile;
