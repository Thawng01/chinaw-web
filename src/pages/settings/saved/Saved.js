import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./saved.css";
import { fetchSavedPost } from "../../../store/actions/Post";
import { AuthContext } from "../../../components/auth/AuthContext";
import Feed from "../../../components/feed/Feed";
import RightSide from "../../../components/sides/rightSide/RightSide";

const Saved = () => {
    const savedPosts = useSelector((state) => state.post.savedPosts);

    const { user, setMessage } = useContext(AuthContext);

    const dispatch = useDispatch();

    useEffect(() => {
        const getSavedPosts = async () => {
            try {
                await dispatch(fetchSavedPost(user));
            } catch (error) {
                setMessage({ text: error.message, type: "error" });
            }
        };
        getSavedPosts();
    }, [dispatch, user, setMessage]);

    return (
        <div className="saved">
            {savedPosts?.length === 0 ? (
                <div className="noSavedPost">
                    <p>You have no saved post yet!</p>

                    <div className="savedPostBtn">
                        <Link className="savedPostLabel" to="/">
                            Try to save any post you like
                        </Link>
                    </div>
                </div>
            ) : (
                <Feed posts={savedPosts} user={user} />
            )}
            <RightSide />
        </div>
    );
};

export default Saved;
