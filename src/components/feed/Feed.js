import { useState } from "react";

import "./feed.css";
import NewPost from "../newPost/NewPost";
import Post from "../post/Post";
import CommentBox from "../comments/CommentBox";
import Popup from "../popupcardmodal/Popup";
import Message from "../message/Message";
import usePostAction from "../../hook/usePostAction";
import useAuthContext from "../../hook/useAuthContext";

const Feed = ({ posts, home, uid, user }) => {
    const [isComment, setIsComment] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [post, setPost] = useState();

    const { message, dark } = useAuthContext();

    const { onPostSave } = usePostAction();

    const openCommentBox = (post) => {
        setPost(post);
        setIsComment(true);
    };

    const onDeletePost = (post) => {
        setPost(post);
        setIsDelete(true);
    };

    return (
        <>
            {isComment && (
                <CommentBox post={post} onComment={() => setIsComment(false)} />
            )}

            {isDelete && (
                <Popup post={post} onClose={() => setIsDelete(false)} />
            )}

            <div
                style={{ backgroundColor: dark ? "#000" : "#fff" }}
                className="feed"
            >
                {message && <Message />}
                {home && <NewPost />}
                {posts?.map((post, index) => (
                    <Post
                        onComment={() => openCommentBox(post)}
                        onDelete={() => onDeletePost(post)}
                        onSave={() => onPostSave(post?.id)}
                        key={index}
                        post={post}
                        uid={uid}
                        user={user}
                    />
                ))}
            </div>
        </>
    );
};

export default Feed;
