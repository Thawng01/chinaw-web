import "./profile.css";
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserPost } from "../../store/actions/User";
import RightSide from "../../components/sides/rightSide/RightSide";
import ProfileHeader from "../../components/profileHeader/ProfileHeader";
import Feed from "../../components/feed/Feed";
import { AuthContext } from "../../components/auth/AuthContext";

const ProfileScreen = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const userPosts = useSelector((state) => state.user.userPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserPosts = async () => {
            await dispatch(fetchUserPost(id));
        };

        getUserPosts();
    }, [id]);

    return (
        <div className="profile">
            <ProfileHeader
                uid={id}
                user={user}
                background={userPosts?.background}
                image={userPosts?.image}
                username={
                    userPosts?.username ? userPosts?.username : userPosts?.email
                }
                bio={userPosts?.bio}
                post={userPosts?.post}
            />

            {userPosts?.post?.length > 0 ? (
                <div className="profileBodyContainer">
                    <Feed
                        posts={userPosts?.post}
                        user={user}
                        uid={userPosts?.uid}
                    />

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
