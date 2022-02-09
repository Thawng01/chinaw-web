import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser } from "../store/actions/User";
import useAuthContext from "./useAuthContext";

export const useUser = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.user);
    const { user, setMessage } = useAuthContext();

    useEffect(() => {
        const getUserInfo = async () => {
            if (user === null) return;
            try {
                await dispatch(fetchUser(user));
            } catch (error) {
                setMessage({ text: error.message, type: "error" });
            }
        };

        getUserInfo();
    }, [user, setMessage, dispatch]);

    return userInfo;
};
