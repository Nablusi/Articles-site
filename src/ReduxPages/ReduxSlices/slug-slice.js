import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const slugFetch = createAsyncThunk(
  "slugSlice/slugFetch",
  async (slug) => {
    const res = await fetch(`https://api.realworld.io/api/articles/${slug}`); 
    const data = await res.json(); 
    return data.article; 
  });


const slugSlice = createSlice({
  name: "slugSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(slugFetch.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default slugSlice.reducer;
