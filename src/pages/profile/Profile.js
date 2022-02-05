import "./profile.css";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserPost, updateProfileBg } from "../../store/actions/User";
import RightSide from "../../components/sides/rightSide/RightSide";
import ProfileHeader from "../../components/profileHeader/ProfileHeader";
import Feed from "../../components/feed/Feed";
import useAuthContext from "../../hook/useAuthContext";

const ProfileScreen = () => {
    const { id } = useParams();

    const { user, setMessage } = useAuthContext();

    const userPosts = useSelector((state) => state.user.userPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserPosts = async () => {
            try {
                await dispatch(fetchUserPost(id));
            } catch (error) {
                setMessage(error.message);
            }
        };

        getUserPosts();
    }, [id, dispatch, setMessage]);

    async function onChangeProfileBg(e) {
        if (e.target.files || e.target.files[0]) {
            try {
                await dispatch(updateProfileBg(e.target.files[0], user));
            } catch (error) {
                setMessage(error.message);
            }
        }
    }

    return (
        <div className="profile">
            <ProfileHeader
                uid={id}
                background={userPosts?.background}
                image={userPosts?.image}
                username={
                    userPosts?.username ? userPosts?.username : userPosts?.email
                }
                bio={userPosts?.bio}
                post={userPosts?.post}
                onChange={onChangeProfileBg}
            />

            {userPosts?.post?.length > 0 ? (
                <div className="profileBodyContainer">
                    <Feed posts={userPosts?.post} uid={userPosts?.uid} />

                    <RightSide />
                </div>
            ) : (
                <div className="profileNewPostBtnContainer">
                    <p>No post yet!</p>

                    {user === id && (
                        <div className="profileNewPostBtn">
                            <Link
                                to="/create_new_post"
                                className="profileNewPostBtnLabel"
                            >
                                Create new post
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileScreen;
