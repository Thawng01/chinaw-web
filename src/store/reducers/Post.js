import {
    FETCH_POSTS,
    FETCH_SAVED_POST,
    FETCH_SINGLE_POST,
} from "../actions/Post";

const initialValue = {
    posts: [],
    post: {},
    savedPosts: [],
    error: null,
};

const Post = (state = initialValue, { type, payload }) => {
    switch (type) {
        case FETCH_POSTS:
            return { ...state, posts: payload };

        case FETCH_SINGLE_POST:
            return { ...state, post: payload };

        case FETCH_SAVED_POST:
            return { ...state, savedPosts: payload };

        case "ERROR":
            return { ...state, error: payload };
        default:
            return state;
    }
};

export default Post;
