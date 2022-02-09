import { useEffect } from "react";
import { likePost, savePost, canLike } from "../store/actions/Post";
import { useDispatch } from "react-redux";
import useAuthContext from "./useAuthContext";

const usePostAction = () => {
    const dispatch = useDispatch();
    const { setMessage, user } = useAuthContext();

    const onPostLike = async (pid, puid) => {
        if (puid === user)
            return setMessage({
                text: "You are not allowed to like your own post",
                type: "error",
            });
        try {
            await dispatch(likePost(user, pid));
        } catch (error) {
            setMessage({ text: error.message, type: "error" });
        }
    };

    const onPostSave = async (pid) => {
        try {
            await dispatch(savePost(user, pid));
        } catch (error) {
            setMessage({ text: error.message, type: "error" });
        }
    };

    useEffect(() => {
        const checkCanLike = async () => {
            if (user === null) return;
            try {
                await dispatch(canLike(user));
            } catch (error) {
                setMessage({ text: error.message, type: "error" });
            }
        };

        checkCanLike();
    }, [user, setMessage, dispatch]);

    return { onPostLike, onPostSave };
};

export default usePostAction;
