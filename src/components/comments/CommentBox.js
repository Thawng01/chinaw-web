import { Photo, Send, ThumbUp } from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import "./commentBox.css";
import { fetchComments, createNewComment } from "../../store/actions/Comment";
import { useUser } from "../../hook/useUser";

const CommentBox = ({ onComment, post }) => {
    const [newComment, setNewComment] = useState("");
    const ref = useRef();
    const userInfo = useUser();

    const comments = useSelector((state) => state.comments.comments);

    const dispatch = useDispatch();

    const closeCommentBox = (e) => {
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
    }, []);

    const createComment = async () => {
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

    return (
        <div className="commentBox" onClick={(e) => closeCommentBox(e)}>
            <IoCloseCircleOutline
                className="closeCommentBox"
                onClick={onComment}
            />
            <div className="commentBoxContainer">
                <div className="commentBoxHeaderContainer">
                    <img
                        src={post?.userImage}
                        alt=""
                        className="postImgInComment"
                    />
                    <span className="postUsernameInComment">
                        {`${post?.username}'s post`}
                    </span>
                </div>

                <div className="commentBodyContainer">
                    {comments?.map((comment, index) => {
                        return (
                            <div key={index} className="commentorsContainer">
                                <img
                                    src={comment.userImage}
                                    alt=""
                                    className="commentorImg"
                                />
                                <div className="commentorInfos">
                                    <div className="commentorInfo">
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
                                            sx={{ fontSize: 18 }}
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
                            </div>
                        );
                    })}
                </div>

                <div className="commentInputContainer">
                    <div className="commentInputAndPhoto">
                        <Photo className="commentPhotoSelector" />
                        <textarea
                            ref={ref}
                            rows={1}
                            type="text"
                            placeholder="Type a comment"
                            className="commentInput"
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
