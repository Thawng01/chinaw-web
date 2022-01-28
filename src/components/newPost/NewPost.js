import "./newPost.css";
import { Link } from "react-router-dom";
import { useUser } from "../../hook/useUser";

const NewPost = () => {
    const userInfo = useUser();
    return (
        <div className="newPost">
            <img src={userInfo?.image} alt="" className="newPostImg" />
            <Link to="/create_new_post" className="newPostBtn">
                <span className="placeholder">What's in your mind?</span>
            </Link>
        </div>
    );
};

export default NewPost;
