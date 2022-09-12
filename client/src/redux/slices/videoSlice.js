import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchVideos = createAsyncThunk('videos/fetchVideos', async (type) => {
    const {data} = await axios.get(`/videos/${type}`);
    return data;
})

const initialState = {
    data: null,
    loading: false,
    error: false
};


const videoSlice = createSlice({
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
        //добавляю юзерайди в масиив лайков и удаляю из дизлайков
        like: (state, action) => {
            if(!state.data.likes.includes(action.payload)) {
                state.data.likes.push(action.payload);
                state.data.dislikes.splice(
                    state.data.dislikes.findIndex(
                        (userId) => userId === action.payload
                    ),1
                )
            }
        },
        dislike: (state, action) => {
            if(!state.data.dislikes.includes(action.payload)) {
                state.data.dislikes.push(action.payload);
                state.data.likes.splice(
                    state.data.likes.findIndex(
                        (userId) => userId === action.payload
                    ),1
                )
            }
        }
    },

})

export const {fetchStart, fetchSuccess, fetchFailure, like, dislike} = videoSlice.actions;
export const videoReducer = videoSlice.reducer;