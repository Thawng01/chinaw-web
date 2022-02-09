import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { addNewPost, canPost } from "../store/actions/Post";
import useAuthContext from "./useAuthContext";

const useNewPost = (id, content, newImage, postToUpdate) => {
    const [loading, setLoading] = useState(false);

    const { setMessage, user } = useAuthContext();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        async function checkCanPost() {
            try {
                await dispatch(canPost(user));
            } catch (error) {
                setMessage({ text: error.message, type: "error" });
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
            setMessage({ text: error.message, type: "error" });
        }

        setLoading(false);
    };

    return { loading, createNewPost };
};

export default useNewPost;
