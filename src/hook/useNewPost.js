import { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../components/auth/AuthContext";
import { addNewPost, canPost } from "../store/actions/Post";

const useNewPost = (id, content, newImage, postToUpdate) => {
    const [loading, setLoading] = useState(false);

    const { setMessage, user } = useContext(AuthContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        async function checkCanPost() {
            try {
                await dispatch(canPost(user));
            } catch (error) {
                setMessage(error.message);
            }
        }

        checkCanPost();
    }, [user, dispatch, setMessage]);

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

    return { loading, createNewPost };
};

export default useNewPost;
