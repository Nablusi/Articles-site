import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getArticlesByPageFetch = createAsyncThunk(
  "getArticlesByPageSlice/getArticlesByPageFetch",
  async ({pageNumber, token}) => {
    const res = await fetch(`https://api.realworld.io/api/articles?offset=${pageNumber}`,
    {
      method:'GET', 
      headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
      }
    }
    ); 
    const data = await res.json(); 
    return data; 
  });


const getArticlesByPageSlice = createSlice({
  name: "getArticlesByPageSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticlesByPageFetch.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default getArticlesByPageSlice.reducer;
