import { useDispatch, useSelector } from "react-redux";

import { searchForUser } from "../store/actions/User";
import useAuthContext from "./useAuthContext";

const useSearch = () => {
    const users = useSelector((state) => state.user.filter_users);
    const dispatch = useDispatch();

    const { setMessage } = useAuthContext();

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
