import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchLogin = createAsyncThunk('user/login',async ({ email, password}) => {
    const {data} = await axios.post('/auth/login', { email, password});
    return data
})
export const fetchRegister = createAsyncThunk('user/fetchRegister',async ({fullName, email, password}) => {
    const {data} = await axios.post('/auth/register', {fullName, email, password});
    return data
})
export const fetchAuthMe = createAsyncThunk('user/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/me')
    return data
})
const initialState = {
    data: null,
    loading: false
};

const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
            logout: (state) => {
                state.data = null
            }
        },
        extraReducers: {
            [fetchLogin.pending]: (state) => {
                state.data = null;
                state.loading = true;
            },
            [fetchLogin.fulfilled]: (state, action) => {
                state.data = action.payload;
                state.loading = false;
            },
            [fetchLogin.rejected]: (state) => {
                state.data = null;
                state.loading = false;
            },
            [fetchAuthMe.pending]: (state) => {
                state.data = null;
                state.loading = true;
            },
            [fetchAuthMe.fulfilled]: (state, action) => {
                state.data = action.payload;
                state.loading = false;
            },
            [fetchAuthMe.rejected]: (state) => {
                state.data = null;
                state.loading = false;
            },
        }
    }
);

export const selectIsAuth = (state) => Boolean(state.user.data);
export const {logout} = userSlice.actions
export const userReducer = userSlice.reducer;