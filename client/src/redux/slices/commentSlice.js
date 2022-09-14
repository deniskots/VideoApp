import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

/*export const createComments = createAsyncThunk('comment/createComments',async ({videoId}) => {
    const {data} = await axios.post(`/comments`, {videoId});
    return data
})*/

const initialState = {
    data: null,
    loading: false,
};

const commentSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        createComment: (state, action) => {

        },
    }

})


export const commentReducer = commentSlice.reducer;