import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchLogin = createAsyncThunk('auth/login',async ({ email, password}) => {
    const {data} = await axios.post('/auth/login', { email, password});
    return data
})
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/me')
    return data
})
const initialState = {
    data: null,
    loading: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            localStorage.removeItem('token')
        }
    },
        extraReducers: {
            [fetchLogin.pending]: (state) => {
                state.data = null;
                state.status = 'loading';
            },
            [fetchLogin.fulfilled]: (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            },
            [fetchLogin.rejected]: (state) => {
                state.data = null;
                state.status = 'error';
            },
            [fetchAuthMe.pending]: (state) => {
                state.data = null;
                state.status = 'loading';
            },
            [fetchAuthMe.fulfilled]: (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            },
            [fetchAuthMe.rejected]: (state) => {
                state.data = null;
                state.status = 'error';
            },
        }
}
);

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const {logout} = authSlice.actions
export const authReducer = authSlice.reducer;