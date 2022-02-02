import { useEffect, useContext } from "react";
import { likePost, savePost, canLike } from "../store/actions/Post";
import { useDispatch } from "react-redux";
import { AuthContext } from "../components/auth/AuthContext";

const usePostAction = () => {
    const dispatch = useDispatch();
    const { setMessage, user } = useContext(AuthContext);

    const onPostLike = async (pid, puid) => {
        if (puid === user)
            return setMessage("You are not allowed to like your own post");
        try {
            await dispatch(likePost(user, pid));
        } catch (error) {
            setMessage(error.message);
        }
    };

    const onPostSave = async (pid) => {
        try {
            await dispatch(savePost(user, pid));
        } catch (error) {
            setMessage(error.message);
        }
    };

    useEffect(() => {
        const checkCanLike = async () => {
            if (user === null) return;
            try {
                await dispatch(canLike(user));
            } catch (error) {
                setMessage(error.message);
            }
        };

        checkCanLike();
    }, [user, setMessage, dispatch]);

    return { onPostLike, onPostSave };
};

export default usePostAction;
