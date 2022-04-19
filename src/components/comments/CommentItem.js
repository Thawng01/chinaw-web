import { memo } from "react";
import { useDispatch } from "react-redux";
import { ThumbUp } from "@mui/icons-material";
import { IoEllipsisVertical } from "react-icons/io5";

import "./commentItem.css";
import { likeComment, deleteComment } from "../../store/actions/Comment";
import { useUser } from "../../hook/useUser";
import useAuthContext from "../../hook/useAuthContext";
import formatDate from "../../components/formatDate";

const CommentItem = ({
    comment,
    pid,
    index,
    indexForDelete,
    onToggleDeleteAction,
}) => {
    const userInfo = useUser();
    const dispatch = useDispatch();

    const { setMessage, dark, user } = useAuthContext();

    let name = comment?.username ? comment?.username : comment?.email;
    name = name?.split("@")[0];

    const onLikeComment = async (cid) => {
        if (user === null) {
            setMessage({ text: "You have to login first", type: "error" });
            return;
        }
        try {
            await dispatch(likeComment(cid, userInfo?.uid));
        } catch (error) {
            setMessage(error.message);
        }
    };

    const onDeleteComment = async (cid, uid) => {
        try {
            await dispatch(deleteComment(cid, pid, uid));
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="commentorsContainer">
            <img src={comment.userImage} alt="" className="commentorImg" />
            <div className="commentorInfos">
                <div
                    style={{
                        color: dark ? "#fff" : "#000",
                        backgroundColor: dark ? "#000" : "#f0f0f0",
                    }}
                    className="commentorInfo"
                >
                    <h4 className="commentorUsername">{name}</h4>
                    {comment?.comment && (
                        <p className="commentBoxText">{comment.comment}</p>
                    )}
                </div>

                {comment?.image && (
                    <img src={comment?.image} alt="" className="commentImg" />
                )}
                <div className="commemtBoxInfo">
                    <span className="commentedDate">
                        {formatDate(comment?.commentedAt)}
                    </span>
                    <ThumbUp
                        onClick={() => onLikeComment(comment.id)}
                        sx={{ fontSize: 18 }}
                        style={{
                            color: comment?.likes?.includes(userInfo?.uid)
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
                                {comment?.likes?.length > 1 ? "Likes" : "Like"}
                            </span>
                        </>
                    )}
                </div>
            </div>
            {userInfo?.uid === comment.uid && (
                <div className="moreHor">
                    <div
                        className="commentDeleteIconContainer"
                        onClick={onToggleDeleteAction}
                    >
                        <IoEllipsisVertical />
                    </div>

                    {indexForDelete === index && (
                        <div
                            style={{ backgroundColor: dark ? "#000" : "#fff" }}
                            className="commentDeleteBox"
                        >
                            <p
                                className="commentDelete"
                                onClick={() =>
                                    onDeleteComment(comment.id, comment.uid)
                                }
                            >
                                Delete
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(CommentItem);
