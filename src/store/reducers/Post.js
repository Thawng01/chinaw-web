import {
    FETCH_POSTS,
    FETCH_SAVED_POST,
    FETCH_SINGLE_POST,
} from "../actions/Post";

const initialValue = {
    status: "idle",
    posts: [],
    post: {},
    savedPosts: [],
};

const Post = (state = initialValue, { type, payload }) => {
    switch (type) {
        case "posts/loading":
            return { ...state, status: "loading" };

        case FETCH_POSTS:
            return { ...state, posts: payload, status: "idle" };

        case FETCH_SINGLE_POST:
            return { ...state, post: payload, status: "idle" };

        case FETCH_SAVED_POST:
            return { ...state, savedPosts: payload };

        default:
            return state;
    }
};

export default Post;
