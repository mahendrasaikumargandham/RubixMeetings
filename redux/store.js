// import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import reducer from "./reducers/index";

function configureStore(initialState) {
    const store = createStore(reducer, initialState);
    return store;
}

export default configureStore;
