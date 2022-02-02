import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import postReducer from "./reducers/Post";
import userReducer from "./reducers/User";
import commentsReducer from "./reducers/Comment";
import pointReducer from "./reducers/Point";

const rootReducer = combineReducers({
    post: postReducer,
    user: userReducer,
    comments: commentsReducer,
    point: pointReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
