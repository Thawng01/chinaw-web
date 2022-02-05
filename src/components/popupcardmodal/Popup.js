import { useDispatch } from "react-redux";
import { useState } from "react";

import "./popup.css";
import Post from "../post/Post";
import { deletePost } from "../../store/actions/Post";
import Loading from "../loading/Loading";
import Message from "../message/Message";
import useAuthContext from "../../hook/useAuthContext";

const Popup = ({ post, onClose }) => {
    const [loading, setLoading] = useState(false);

    const { dark, message, setMessage } = useAuthContext();

    const dispatch = useDispatch();

    const onDeletePost = async () => {
        setLoading(true);
        try {
            await dispatch(deletePost(post?.id));
            onClose();
        } catch (error) {
            setMessage(error.message);
        }
        setLoading(false);
    };

    function onClosePopup(e) {
        if (e.target.className === "popup") {
            onClose();
        }
    }

    return (
        <div className="popup" onClick={(e) => onClosePopup(e)}>
            {loading && <Loading title="Deleting..." />}
            {message && <Message />}
            <div
                style={{ backgroundColor: dark ? "#333" : "#fff" }}
                className="popupContainer"
            >
                <div className="postToDeleteContainer">
                    <Post post={post} />
                </div>

                <div className="confirmBtnContainer">
                    <div className="confirmBtn" onClick={onDeletePost}>
                        <span>Confirm</span>
                    </div>
                    <div className="cancelBtn" onClick={onClose}>
                        <span>Cancel</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
