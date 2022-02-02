import { FETCH_USER, FETCH_USER_POST, FILTERED_USER } from "../actions/User";

const initialValue = {
    user: {},
    userPosts: {},
    filter_users: [],
};

const User = (state = initialValue, { type, payload }) => {
    switch (type) {
        case FETCH_USER:
            return { ...state, user: payload };

        case FETCH_USER_POST:
            return { ...state, userPosts: payload };

        case FILTERED_USER:
            return { ...state, filter_users: payload };

        default:
            return state;
    }
};

export default User;
