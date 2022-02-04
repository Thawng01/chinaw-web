import "./newPost.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hook/useUser";
import { AuthContext } from "../auth/AuthContext";

const NewPost = () => {
    const userInfo = useUser();
    const { user, dark } = useContext(AuthContext);
    return (
        <div
            style={{ backgroundColor: dark ? "#333" : "white" }}
            className="newPost"
        >
            {user ? (
                <img src={userInfo?.image} alt="" className="newPostImg" />
            ) : (
                <img
                    src={"/assets/placeholder.png"}
                    alt=""
                    className="newPostImg"
                />
            )}
            <Link
                to="/create_new_post"
                style={{ backgroundColor: dark ? "#4d4d4d" : "#f1f1f1" }}
                className="newPostBtn"
            >
                <span
                    style={{ color: dark ? "#ccc" : "gray" }}
                    className="placeholder"
                >
                    What's in your mind?
                </span>
            </Link>
        </div>
    );
};

export default NewPost;
