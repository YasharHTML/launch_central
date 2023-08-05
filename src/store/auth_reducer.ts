import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
    name: "AUTH",
    initialState,
    reducers: {
        setState(state, action) {
            state = action.payload;
            return state;
        },
    },
});

export const authReducer = authSlice.reducer;
export const { setState } = authSlice.actions;
