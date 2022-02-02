import { FETCH_POINT_CLAIM } from "../actions/Point";

const initialValue = {
    points: [],
};

export default (state = initialValue, { type, payload }) => {
    switch (type) {
        case FETCH_POINT_CLAIM:
            return { ...state, points: payload };

        default:
            return state;
    }
};
