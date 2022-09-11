import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchVideos = createAsyncThunk('videos/fetchVideos', async (type) => {
    const {data} = await axios.get(`/videos/${type}`);
    return data;
})

const initialState = {
    video: [],
    loading: false
};


const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {},

})

export const videoReducer = videoSlice.reducer;