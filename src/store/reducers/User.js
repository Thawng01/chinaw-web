import { FETCH_USER, FETCH_USER_POST } from "../actions/User";

const initialValue = {
    user: {},
    userPosts: {},
};

export default (state = initialValue, { type, payload }) => {
    switch (type) {
        case FETCH_USER:
            return { ...state, user: payload };

        case FETCH_USER_POST:
            return { ...state, userPosts: payload };

        default:
            return state;
    }
};
