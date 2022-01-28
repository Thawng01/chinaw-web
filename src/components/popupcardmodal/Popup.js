import Post from "../post/Post";
import "./popup.css";
import { useDispatch } from "react-redux";

import { deletePost } from "../../store/actions/Post";
import { useState } from "react";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

const Popup = ({ post, onClose }) => {
    const [loading, setLoading] = useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const onDeletePost = async () => {
        setLoading(true)
        try {
            await dispatch(deletePost(post?.id))
            onClose()
        } catch (error) {
            console.log(error.message)
        }
        setLoading(false)
    }


    function onClosePopup(e) {
        if (e.target.className === 'popup') {
            onClose()
        }
    }

    return <div className="popup" onClick={e => onClosePopup(e)}>
           {loading && <Loading title="Deleting..." />}
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
    </div>;
};

export default Popup;
