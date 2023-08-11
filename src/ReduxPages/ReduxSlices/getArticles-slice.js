import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const articleFetch = createAsyncThunk(
  "articleSlice/articleFetch",
  async () => {
    const res = await fetch(`https://api.realworld.io/api/articles?limit=10`); 
    const data = await res.json(); 
    return data; 
  });


const articleSlice = createSlice({
  name: "articleSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(articleFetch.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default articleSlice.reducer;
