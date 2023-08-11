import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const feddFetch = createAsyncThunk(
  "feedSlice/feddFetch",
  async ({token, pageNumber}) => {
    const res = await fetch(`https://api.realworld.io/api/articles/feed?offset=${pageNumber}`, 
    {
        method:'GET', 
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    }); 
    const data = await res.json(); 
    return data; 
  });


const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(feddFetch.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default feedSlice.reducer;
