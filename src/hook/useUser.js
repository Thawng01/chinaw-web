import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser } from "../store/actions/User";
import useAuthContext from "./useAuthContext";

export const useUser = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.user);
    const { user } = useAuthContext();

    useEffect(() => {
        const getUserInfo = async () => {
            if (user === null) return;
            await dispatch(fetchUser(user));
        };

        getUserInfo();
    }, [user, dispatch]);

    return userInfo;
};
