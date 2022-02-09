import { FETCH_USER, FETCH_USER_POST, FILTERED_USER } from "../actions/User";

const initialValue = {
    status: "idle",
    user: {},
    userPosts: {},
    filter_users: [],
};

const User = (state = initialValue, { type, payload }) => {
    switch (type) {
        case "users/loading":
            return { ...state, status: "loading" };

        case FETCH_USER:
            return { ...state, user: payload, status: "idle" };

        case FETCH_USER_POST:
            return { ...state, userPosts: payload, status: "idle" };

        case FILTERED_USER:
            return { ...state, filter_users: payload, status: "idle" };

        default:
            return state;
    }
};

export default User;
