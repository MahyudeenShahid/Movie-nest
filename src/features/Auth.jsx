import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user:{},
    isAuthenticated: false,
    sessionId: ""
}
const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.sessionId = localStorage.getItem('Session_id') || "";
            localStorage.setItem('Account_ID', action.payload.id);
        },
        clearUser: (state) => {
            state.user = {};
            state.isAuthenticated = false;
            state.sessionId = "";
        },
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        }
    }
});

export const { setUser, clearUser, setSessionId } = AuthSlice.actions;
export default AuthSlice.reducer;

export const userSelector = (state) => state.user;
