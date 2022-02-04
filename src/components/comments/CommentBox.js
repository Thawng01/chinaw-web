import { Photo, Send, ThumbUp } from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import { IoCloseCircleOutline, IoEllipsisVertical } from "react-icons/io5";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import "./commentBox.css";
import {
    fetchComments,
    createNewComment,
    deleteComment,
    likeComment,
} from "../../store/actions/Comment";
import { useUser } from "../../hook/useUser";
import useAuthContext from "../../hook/useAuthContext";
import Underline from "../Underline";

const CommentBox = ({ onComment, post }) => {
    const [newComment, setNewComment] = useState("");
    const [indexForDelete, setIndexForDelete] = useState(null);

    const ref = useRef();
    const userInfo = useUser();
    const { dark } = useAuthContext();

    const comments = useSelector((state) => state.comments.comments);

    const dispatch = useDispatch();

    const closeCommentBox = (e) => {
        if (indexForDelete !== null) {
            if (e.target.className !== "commentDeleteIconContainer") {
                setIndexForDelete(null);
            }
        }

        if (e.target.className === "commentBox") {
            onComment();
        }
    };

    useEffect(() => {
        const getComment = async () => {
            try {
                await dispatch(fetchComments(post?.id));
            } catch (error) {
                console.log(error.message);
            }
        };

        ref?.current?.focus();
        getComment();
    }, [dispatch, post?.id]);

    const createComment = async () => {
        setNewComment("");
        try {
            await dispatch(
                createNewComment(
                    newComment,
                    post?.id,
                    userInfo?.uid,
                    userInfo?.image,
                    userInfo?.username
                )
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const onDeleteComment = async (cid, uid) => {
        setIndexForDelete(null);
        try {
            await dispatch(deleteComment(cid, post?.id, uid));
        } catch (error) {
            console.log(error.message);
        }
    };

    const onLikeComment = async (cid) => {
        try {
            await dispatch(likeComment(cid, userInfo?.uid));
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="commentBox" onClick={(e) => closeCommentBox(e)}>
            <IoCloseCircleOutline
                className="closeCommentBox"
                onClick={onComment}
            />
            <div
                style={{ backgroundColor: dark ? "#333" : "#fff" }}
                className="commentBoxContainer"
            >
                <div
                    style={{ borderBottomColor: dark ? "#ccc" : "#f1f1f1" }}
                    className="commentBoxHeaderContainer"
                >
                    <img src={post?.userImage} className="postImgInComment" />
                    <span className="postUsernameInComment">
                        {`${post?.username}'s post`}
                    </span>
                </div>
                <Underline />

                <div className="commentBodyContainer">
                    {comments?.map((comment, index) => {
                        return (
                            <div key={index} className="commentorsContainer">
                                <img
                                    src={comment.userImage}
                                    className="commentorImg"
                                />
                                <div className="commentorInfos">
                                    <div
                                        style={{
                                            color: dark ? "#fff" : "#000",
                                            backgroundColor: dark
                                                ? "#000"
                                                : "#f0f0f0",
                                        }}
                                        className="commentorInfo"
                                    >
                                        <h4 className="commentorUsername">
                                            {comment.username}
                                        </h4>
                                        <p className="commentBoxText">
                                            {comment.comment}
                                        </p>
                                    </div>
                                    <div className="commemtBoxInfo">
                                        <span className="commentedDate">
                                            {moment(
                                                comment?.commentedAt
                                            ).fromNow()}
                                        </span>
                                        <ThumbUp
                                            onClick={() =>
                                                onLikeComment(comment.id)
                                            }
                                            sx={{ fontSize: 18 }}
                                            style={{
                                                color: comment?.likes?.includes(
                                                    userInfo?.uid
                                                )
                                                    ? "#ff1a8c"
                                                    : "gray",
                                            }}
                                            className="commentLikeAction"
                                        />
                                        {comment?.likes?.length > 0 && (
                                            <>
                                                <span className="commentLikeNum">
                                                    {comment?.likes?.length}
                                                </span>
                                                <span className="commentLikeLabel">
                                                    {comment?.likes?.length > 1
                                                        ? "Likes"
                                                        : "Like"}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {userInfo?.uid === comment.uid && (
                                    <div className="moreHor">
                                        <div
                                            className="commentDeleteIconContainer"
                                            onClick={() =>
                                                setIndexForDelete(
                                                    index === indexForDelete
                                                        ? null
                                                        : index
                                                )
                                            }
                                        >
                                            <IoEllipsisVertical />
                                        </div>

                                        {indexForDelete === index && (
                                            <div className="commentDeleteBox">
                                                <p
                                                    className="commentDelete"
                                                    onClick={() =>
                                                        onDeleteComment(
                                                            comment.id,
                                                            comment.uid
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </p>
                                                <p className="commentEdit">
                                                    Edit
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <Underline />

                <div className="commentInputContainer">
                    <div className="commentInputAndPhoto">
                        <Photo className="commentPhotoSelector" />
                        <textarea
                            style={{ color: dark ? "#fff" : "#000" }}
                            ref={ref}
                            rows={1}
                            type="text"
                            placeholder="Type a comment"
                            className="commentInput"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                    </div>
                    <Send
                        onClick={createComment}
                        style={{ color: newComment ? "#ff1a8c" : "grey" }}
                        className="commentSend"
                    />
                </div>
            </div>
        </div>
    );
};

export default CommentBox;
