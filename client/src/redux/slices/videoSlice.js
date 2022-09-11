import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    data: null,
    loading: false
};


const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {}
})

export const videoReducer = videoSlice.reducer;