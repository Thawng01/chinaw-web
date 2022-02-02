import { useDispatch } from "react-redux";
import { useContext, useState } from "react";

import "./popup.css";
import Post from "../post/Post";
import { deletePost } from "../../store/actions/Post";
import Loading from "../loading/Loading";
import { AuthContext } from "../../components/auth/AuthContext";
import Message from "../message/Message";

const Popup = ({ post, onClose }) => {
    const [loading, setLoading] = useState(false);

    const { message, setMessage } = useContext(AuthContext);

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
            <div className="popupContainer">
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
