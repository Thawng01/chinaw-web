import { Link } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import {
    IoBookmarkOutline,
    IoChatbubbleEllipsesOutline,
    IoCreateOutline,
    IoHeartOutline,
    IoHeart,
    IoBookmark,
} from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

import "./post.css";
import usePostAction from "../../hook/usePostAction";
import useAuthContext from "../../hook/useAuthContext";
import Underline from "../Underline";

const Post = ({ post, onComment, onDelete, onSave, uid }) => {
    const { dark, user, setMessage } = useAuthContext();

    const [readMore, setReadMore] = useState(true);
    const [isLiked, setIsLiked] = useState(
        post?.likes?.includes(user) ? true : false
    );
    const [likeNum, setLikeNum] = useState(post?.likes?.length);

    const { onPostLike } = usePostAction();

    const toggleReadMore = () => {
        setReadMore(!readMore);
    };

    const onLike = async () => {
        if (user === null) {
            setMessage({ text: "You have to login first", type: "error" });
            return;
        }
        if (isLiked) {
            setLikeNum(likeNum - 1);
            setIsLiked(false);
            await onPostLike(post?.id, post?.uid);
        } else {
            setIsLiked(true);
            setLikeNum(likeNum + 1);
            await onPostLike(post?.id, post?.uid);
        }
    };

    let username = post?.username.split("@")[0];

    return (
        <div className="postWrapperInFeed">
            <div
                style={{ backgroundColor: dark ? "#333" : "white" }}
                className="postCards"
            >
                <div className="postCardTop">
                    <img src={post.userImage} className="postCardUserImg" />

                    <Link
                        className="postUsernameLink"
                        to={`/profile/${post?.uid}`}
                    >
                        <span
                            style={{ color: dark ? "#fff" : "#000" }}
                            className="postCardUsername"
                        >
                            {username}
                        </span>
                    </Link>
                    <span
                        style={{ color: dark ? "#ccc" : "gray" }}
                        className="postCardDate"
                    >
                        {moment(post?.createdAt).fromNow()}
                    </span>
                </div>
                <div className="postCardCenter">
                    <div className="postDesc">
                        {readMore ? post?.content.slice(0, 240) : post?.content}
                        {post?.content?.length > 240 && (
                            <span className="readMore" onClick={toggleReadMore}>
                                {readMore ? " ... read more" : " show less"}
                            </span>
                        )}
                    </div>
                    <img src={post?.image} alt="" className="postCardImg" />
                </div>

                <Underline />
                <div className="postCardBottom">
                    {user && user === uid ? (
                        <div
                            className="deletePostIconContainer"
                            onClick={onDelete}
                        >
                            <MdDeleteOutline
                                style={{ color: dark ? "#fff" : "#000" }}
                                className="deleteIcon"
                            />
                        </div>
                    ) : (
                        <div className="likeContainer">
                            <div className="likeIconContainer" onClick={onLike}>
                                {isLiked ? (
                                    <IoHeart
                                        style={{ color: "red" }}
                                        className="postIcon"
                                    />
                                ) : (
                                    <IoHeartOutline
                                        style={{
                                            color: dark ? "#fff" : "#000",
                                        }}
                                        className="postIcon"
                                    />
                                )}
                            </div>
                            {likeNum > 0 && (
                                <>
                                    <span
                                        style={{
                                            color: dark ? "#ccc" : "gray",
                                        }}
                                        className="likeCount"
                                    >
                                        {likeNum}
                                    </span>
                                    <span
                                        style={{
                                            color: dark ? "#ccc" : "gray",
                                        }}
                                        className="likeCountLabel"
                                    >
                                        {likeNum > 1 ? " Likes" : " Like"}
                                    </span>
                                </>
                            )}
                        </div>
                    )}

                    {user && user === uid ? (
                        <Link
                            to={{
                                pathname: `/update_post/${post?.id}`,
                            }}
                            className="editPostIconContainer"
                        >
                            <IoCreateOutline
                                style={{ color: dark ? "#fff" : "#000" }}
                                className="editIcon"
                            />
                        </Link>
                    ) : (
                        <div className="commentContainer" onClick={onComment}>
                            {post?.comments?.length > 0 && (
                                <span className="commentNum">
                                    {post?.comments?.length}
                                </span>
                            )}
                            <IoChatbubbleEllipsesOutline
                                style={{ color: dark ? "#fff" : "#000" }}
                                className="postIcon"
                            />
                        </div>
                    )}
                    <div className="saveIconContainer" onClick={onSave}>
                        {post?.savedBy?.includes(user) ? (
                            <IoBookmark
                                style={{ color: dark ? "#fff" : "#000" }}
                                className="postIcon"
                            />
                        ) : (
                            <IoBookmarkOutline
                                style={{ color: dark ? "#fff" : "#000" }}
                                className="postIcon"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
