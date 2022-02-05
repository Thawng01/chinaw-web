import { EditOutlined, PersonOutline } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import "./updateprofile.css";
import { useUser } from "../../../hook/useUser";
import AppButton from "../../../components/Appbutton/AppButton";
import ProfileFormInput from "../../../components/profileform/ProfileFormInput";
import ProfilesFormWrapper from "../../../components/profileform/profilesformWrapper/ProfilesFormWrapper";
import { updateUserProfile } from "../../../store/actions/User";
import Loading from "../../../components/loading/Loading";
import Message from "../../../components/message/Message";
import useAuthContext from "../../../hook/useAuthContext";

const UpdateProfile = () => {
    const { message, setMessage } = useAuthContext();

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

            setMessage("You have successfully updated your profile");
        } catch (error) {
            console.log(error.message);
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
            {message && <Message />}
            {loading && <Loading title="Updating..." />}
            <ProfilesFormWrapper height={300} onSubmit={updateProfile}>
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

                <ProfileFormInput
                    Icon={PersonOutline}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <ProfileFormInput
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
