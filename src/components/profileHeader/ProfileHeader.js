import { IoCameraOutline } from "react-icons/io5";
import { useRef } from "react";

import "./profileheader.css";

const ProfileHeader = ({
    uid,
    user,
    background,
    image,
    username,
    bio,
    post,
    onChange,
}) => {
    let name = username?.split("@")[0];

    const profileRef = useRef();

    function changeProfileBackground() {
        profileRef?.current?.click();
    }

    return (
        <div className="profileContainer">
            <div className="profileCoverContainer">
                {background ? (
                    <img
                        src={background}
                        alt="profile cover"
                        className="profileCoverImg"
                    />
                ) : (
                    <p>No background image</p>
                )}

                {user === uid && (
                    <div
                        className="changeProfileCoverImg"
                        onClick={changeProfileBackground}
                    >
                        <input
                            ref={profileRef}
                            type="file"
                            style={{ display: "none" }}
                            onChange={onChange}
                        />
                        <IoCameraOutline
                            style={{ fontSize: 25, color: "#fff" }}
                        />
                    </div>
                )}
            </div>
            <div className="profileInfos">
                <img src={image} alt="profile" className="profileImg" />
                <p className="profileUsername">{name}</p>
                {bio && <p className="profileDesc">{bio}</p>}
                <span>
                    {post?.length}{" "}
                    <span>{post?.length > 1 ? "Posts" : "Post"}</span>
                </span>
            </div>
        </div>
    );
};

export default ProfileHeader;
