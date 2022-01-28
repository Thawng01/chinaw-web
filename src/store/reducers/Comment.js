import { FETCH_COMMENTS } from "../actions/Comment";

const initialValue = {
    comments: [],
};

export default (state = initialValue, { type, payload }) => {
    switch (type) {
        case FETCH_COMMENTS:
            return { ...state, comments: payload };

        default:
            return state;
    }
};
