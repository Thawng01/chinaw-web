import { Photo, Send } from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import {
    IoArrowBackOutline,
    IoCloseCircleOutline,
    IoCloseOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "./comment.css";
import { fetchComments, createNewComment } from "../../store/actions/Comment";
import { useUser } from "../../hook/useUser";
import useAuthContext from "../../hook/useAuthContext";
import Underline from "../../components/Underline";
import CommentItem from "../../components/comments/CommentItem";

const Comment = () => {
    const [newComment, setNewComment] = useState("");
    const [indexForDelete, setIndexForDelete] = useState(null);
    const [commentImg, setCommentImg] = useState();

    const { id } = useParams();
    const ref = useRef();
    const inputRef = useRef();

    const userInfo = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const { dark, setMessage, user } = useAuthContext();

    const comments = useSelector((state) => state.comments.comments);
    const post = useSelector((state) =>
        state.post.posts.find((p) => p.id === id)
    );

    const dispatch = useDispatch();

    const closeCommentBox = (e) => {
        if (indexForDelete !== null) {
            if (e.target.className !== "commentDeleteIconContainer") {
                setIndexForDelete(null);
            }
        }

        if (e.target.className === "commentBox") {
            navigate(-1);
        }
    };

    const closeCommentBoxByClickingCloseIcon = () => {
        navigate(-1);
    };

    const backToHome = () => {
        navigate(-1);
    };

    useEffect(() => {
        const getComment = async () => {
            try {
                await dispatch(fetchComments(id));
            } catch (error) {
                setMessage({ text: error.message, type: "error" });
            }
        };

        getComment();
        ref?.current?.focus();
    }, [dispatch, id, setMessage]);

    const createComment = async () => {
        if (user === null) {
            navigate("/register", { state: location });
            return;
        }

        if (!newComment && !commentImg?.src) {
            return setMessage({ text: "Type something", type: "error" });
        }

        setNewComment("");
        setCommentImg("");
        try {
            await dispatch(
                createNewComment(
                    newComment,
                    commentImg,
                    id,
                    userInfo?.uid,
                    userInfo?.image,
                    userInfo?.username
                )
            );
        } catch (error) {
            setMessage({ text: error.message, type: "error" });
        }
    };

    function selectCommentImg() {
        inputRef?.current?.click();
    }

    function onSelectImg(e) {
        if (e.target.files && e.target.files[0]) {
            setCommentImg({
                src: URL.createObjectURL(e.target.files[0]),
                file: e.target.files[0],
            });
        }
    }

    const commentItem = comments?.map((comment, index) => {
        return (
            <CommentItem
                key={index}
                pid={post.id}
                index={index}
                comment={comment}
                indexForDelete={indexForDelete}
                onToggleDeleteAction={() =>
                    setIndexForDelete(index === indexForDelete ? null : index)
                }
            />
        );
    });

    return (
        <div className="commentBox" onClick={(e) => closeCommentBox(e)}>
            <IoCloseCircleOutline
                className="closeCommentBox"
                onClick={closeCommentBoxByClickingCloseIcon}
            />
            <div
                style={{ backgroundColor: dark ? "#333" : "#fff" }}
                className="commentBoxContainer"
            >
                <div
                    style={{ borderBottomColor: dark ? "#ccc" : "#f1f1f1" }}
                    className="commentBoxHeaderContainer"
                >
                    <div className="commentBackIconContainer">
                        <IoArrowBackOutline
                            className="commentBackIcon"
                            onClick={backToHome}
                        />
                    </div>

                    <img src={post?.userImage} className="postImgInComment" />
                    <span className="postUsernameInComment">
                        {`${post?.username}'s post`}
                    </span>
                </div>
                <Underline />
                <div className="commentBodyContainer">
                    {commentItem}
                    {commentImg && (
                        <div className="commentImgContainer">
                            <IoCloseOutline
                                className="commentImgDeleteIcon"
                                onClick={() => setCommentImg(null)}
                            />
                            <img
                                src={commentImg.src}
                                className="selectedCommentImg"
                            />
                        </div>
                    )}
                </div>

                <Underline />
                <div className="commentInputContainer">
                    <div className="commentInputAndPhoto">
                        <input
                            ref={inputRef}
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => onSelectImg(e)}
                        />
                        <Photo
                            className="commentPhotoSelector"
                            onClick={selectCommentImg}
                        />
                        <textarea
                            style={{
                                backgroundColor: dark ? "#333" : "#fff",
                                color: dark ? "#fff" : "#000",
                            }}
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
                        style={{
                            color:
                                newComment || commentImg?.src
                                    ? "#ff1a8c"
                                    : "grey",
                        }}
                        className="commentSend"
                    />
                </div>
            </div>
        </div>
    );
};

export default Comment;
