import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const tagFetch = createAsyncThunk(
  "tagSlice/tagFetch",
  async () => {
    const res = await fetch(`https://api.realworld.io/api/tags`); 
    const data = await res.json(); 
    return data.tags; 
  });


const tagSlice = createSlice({
  name: "tagSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(tagFetch.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default tagSlice.reducer;
