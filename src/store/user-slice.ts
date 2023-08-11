import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/interfaces/user/user.model";

const initialState: User = {
    userName: "",
    role: "",
    loggedIn: false,
    token: ""
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: User, action: PayloadAction<User>) => {
            return {
                ...action.payload,
                loggedIn: true,
            }
        },
    },
});



export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;