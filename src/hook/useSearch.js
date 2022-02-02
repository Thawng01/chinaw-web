import { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../components/auth/AuthContext";
import { searchForUser } from "../store/actions/User";

const useSearch = () => {
    const users = useSelector((state) => state.user.filter_users);
    const dispatch = useDispatch();

    const { setMessage } = useContext(AuthContext);

    const onSearch = async (e) => {
        try {
            await dispatch(searchForUser(e.target.value));
        } catch (error) {
            setMessage(error.message);
        }
    };

    return { onSearch, users };
};

export default useSearch;
