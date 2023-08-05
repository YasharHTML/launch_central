import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth_reducer";

const reducer = combineReducers({
    authReducer,
});

export const store = configureStore({
    reducer,
});
