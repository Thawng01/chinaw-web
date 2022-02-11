import { useState } from "react";

import "./feed.css";
import NewPost from "../newPost/NewPost";
import Post from "../post/Post";
import Popup from "../popupcardmodal/Popup";
import usePostAction from "../../hook/usePostAction";
import useAuthContext from "../../hook/useAuthContext";

const Feed = ({ posts, home, uid }) => {
    const [isDelete, setIsDelete] = useState(false);
    const [post, setPost] = useState();

    const { dark } = useAuthContext();
    const { onPostSave } = usePostAction();

    const onDeletePost = (post) => {
        setPost(post);
        setIsDelete(true);
    };

    return (
        <>
            {isDelete && (
                <Popup post={post} onClose={() => setIsDelete(false)} />
            )}

            <div
                style={{ backgroundColor: dark ? "#000" : "#fff" }}
                className="feed"
            >
                {home && <NewPost />}
                {posts?.map((post, index) => (
                    <Post
                        onDelete={() => onDeletePost(post)}
                        onSave={() => onPostSave(post?.id)}
                        key={index}
                        post={post}
                        uid={uid}
                    />
                ))}
            </div>
        </>
    );
};

export default Feed;
