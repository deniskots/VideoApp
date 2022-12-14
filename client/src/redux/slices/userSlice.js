import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
/*import axios from "../../utils/axios";*/

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
            },
            sub: (state, action) => {
                if (state.data.subscribedUsers.includes(action.payload)) {
                    state.data.subscribedUsers.splice(
                        state.data.subscribedUsers.findIndex(
                            (channelId) => channelId === action.payload
                        ),1
                    )
                }else{
                    state.data.subscribedUsers.push(action.payload)
                }
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
export const {logout, sub} = userSlice.actions
export const userReducer = userSlice.reducer;