import { Photo } from "@mui/icons-material";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "./createNewPost.css";
import { AuthContext } from "../../components/auth/AuthContext";
import { addNewPost, fetchSinglePost } from "../../store/actions/Post";
import { useUser } from "../../hook/useUser";
import Loading from "../../components/loading/Loading";
import Message from "../../components/message/Message";

const CreateNewPost = () => {
    const { id } = useParams();
    const postToUpdate = useSelector((state) => state.post.post);

    const [content, setContent] = useState(id ? postToUpdate?.content : "");
    const [newImage, setNewImage] = useState({
        src: id ? postToUpdate?.image : null,
    });
    const [loading, setLoading] = useState(false);
    const userInfo = useUser();

    let name = userInfo?.username ? userInfo?.username : userInfo?.email;
    name = name?.split("@")[0];

    const { user, message, setMessage } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInputRef = useRef();
    const ref = useRef();

    useEffect(() => {
        const getPostToUpdate = async () => {
            if (!id) return;
            setLoading(true);
            try {
                await dispatch(fetchSinglePost(id));
            } catch (error) {
                setMessage(error.message);
            }
            setLoading(false);
        };

        ref?.current?.focus();

        getPostToUpdate();
    }, [id]);

    const createNewPost = async () => {
        if (user === null) {
            navigate("/register", { state: location });
            return;
        }

        setLoading(true);

        try {
            if (id) {
                let imageToUpdate = postToUpdate?.image;
                await dispatch(
                    addNewPost(content, newImage, user, id, imageToUpdate)
                );
            } else {
                await dispatch(addNewPost(content, newImage, user));
            }
            navigate(-1);
        } catch (error) {
            setMessage(error.message);
        }

        setLoading(false);
    };

    const closeNewPostModal = (e) => {
        if (e.target.className === "newPostModal") {
            navigate(-1);
        }
    };

    const selectImage = () => {
        fileInputRef.current.click();
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage({
                src: URL.createObjectURL(e.target.files[0]),
                file: e.target.files[0],
            });
        }
    };

    return (
        <div className="newPostModal" onClick={(e) => closeNewPostModal(e)}>
            <IoCloseCircleOutline
                className="closeNewPostModalBox"
                onClick={() => navigate(-1)}
            />
            {loading && <Loading title="Uploading..." />}
            {message && <Message />}
            <div className="newPostModalWrapper">
                <div className="newPostModalUserInfos">
                    <img
                        src={userInfo?.image}
                        alt="new post image"
                        className="newPostModalUserImg"
                    />
                    <span className="newPostModalUserName">{name}</span>
                </div>

                <div className="newPostInputContainer">
                    <form>
                        <textarea
                            ref={ref}
                            type="text"
                            rows={8}
                            placeholder="What's in your mind?"
                            className="newPostInput"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={onImageChange}
                        />

                        {newImage?.src && (
                            <div className="selectedNewImageContainer">
                                <img
                                    src={newImage.src}
                                    className="selectedNewImage"
                                />
                                <div
                                    className="removeSelectedImage"
                                    onClick={() => setNewImage(null)}
                                >
                                    <MdDeleteOutline className="removeSelectedImageBtn" />
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                <div className="newPostModalSelectImg">
                    <div className="newImageContainer" onClick={selectImage}>
                        <Photo className="newPostModalIcon" />
                        <span className="newPostModalSelectImgLabel">
                            Photo
                        </span>
                    </div>
                </div>
                <div className="newPostModalBtnContainer">
                    <button className="newPostModalBtn" onClick={createNewPost}>
                        {id ? "Update post" : "Create post"}
                    </button>
                    <button
                        className="newPostModalCancelBtn"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewPost;
