import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../components/auth/AuthContext";

import { fetchUser } from "../store/actions/User";

export const useUser = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.user);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        dispatch(fetchUser(user));
    }, [user]);

    return userInfo;
};
