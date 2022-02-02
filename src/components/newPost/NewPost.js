import "./newPost.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hook/useUser";
import { AuthContext } from "../auth/AuthContext";

const NewPost = () => {
    const userInfo = useUser();
    const { user } = useContext(AuthContext);
    return (
        <div className="newPost">
            {user ? (
                <img src={userInfo?.image} alt="" className="newPostImg" />
            ) : (
                <img
                    src={"/assets/placeholder.png"}
                    alt=""
                    className="newPostImg"
                />
            )}
            <Link to="/create_new_post" className="newPostBtn">
                <span className="placeholder">What's in your mind?</span>
            </Link>
        </div>
    );
};

export default NewPost;
