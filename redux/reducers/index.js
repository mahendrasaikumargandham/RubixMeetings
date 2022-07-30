import { combineReducers } from "redux";
import classReducer from "./classReducer";

let reducer = combineReducers({
    classReducer: classReducer
});

const rootReducer = (state, action) => {
    return reducer(state, action)
};

export default rootReducer;
