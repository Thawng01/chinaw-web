import { useNavigate } from "react-router-dom";

import "./newPost.css";
import { useUser } from "../../hook/useUser";
import useAuthContext from "../../hook/useAuthContext";

const NewPost = () => {
    const userInfo = useUser();
    const navigate = useNavigate();
    const { user, dark, setMessage } = useAuthContext();

    const handleNewPost = () => {
        if (user === null) {
            setMessage({ text: "You have to login first", type: "error" });
            return;
        }
        navigate("/create_new_post");
    };

    return (
        <div
            style={{ backgroundColor: dark ? "#333" : "white" }}
            className="newPost"
        >
            {user ? (
                <img src={userInfo?.image} alt="" className="newPostImg" />
            ) : (
                <img
                    src={"assets/placeholder.png"}
                    alt=""
                    className="newPostImg"
                />
            )}
            <div
                style={{ backgroundColor: dark ? "#4d4d4d" : "#f1f1f1" }}
                className="newPostBtn"
                onClick={handleNewPost}
            >
                <span
                    style={{ color: dark ? "#ccc" : "gray" }}
                    className="placeholder"
                >
                    What's in your mind?
                </span>
            </div>
        </div>
    );
};

export default NewPost;
