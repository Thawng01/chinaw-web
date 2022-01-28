import { useContext, useState } from "react";
import { useDispatch } from "react-redux";

import "./feed.css";
import NewPost from "../newPost/NewPost";
import Post from "../post/Post";
import CommentBox from "../comments/CommentBox";
import Popup from "../popupcardmodal/Popup";
import Message from "../message/Message";
import { likePost, savePost } from "../../store/actions/Post";
import { AuthContext } from "../auth/AuthContext";

const Feed = ({ posts, home, uid, user }) => {
    const [isComment, setIsComment] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [post, setPost] = useState();

    const { message, setMessage } = useContext(AuthContext);

    const dispatch = useDispatch();

    const onPostLike = async (pid, puid) => {
        if (puid === user)
            return setMessage("You are not allowed to like your own post");
        try {
            await dispatch(likePost(user, pid));
        } catch (error) {
            console.log(error.message);
        }
    };

    const onPostSave = async (pid) => {
        try {
            await dispatch(savePost(user, pid));
        } catch (error) {
            console.log(error.message);
        }
    };

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

            <div className="feed">
                {message && <Message />}
                {home && <NewPost />}
                {posts?.map((post, index) => (
                    <Post
                        onComment={() => openCommentBox(post)}
                        onDelete={() => onDeletePost(post)}
                        onLike={() => onPostLike(post?.id, post?.uid)}
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
