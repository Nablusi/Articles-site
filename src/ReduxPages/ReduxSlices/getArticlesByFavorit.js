import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getArticlesByFavoritFetch = createAsyncThunk(
  "getArticlesByFavoritSlice/getArticlesByFavoritFetch",
  async ({username, pageNumber, token}) => {
    const res = await fetch(`https://api.realworld.io/api/articles?favorited=${username}&offset=${pageNumber}`,
    {
      method:"GET", 
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
    }); 
    const data = await res.json(); 
    return data; 
  });


const getArticlesByFavoritSlice = createSlice({
  name: "getArticlesByFavoritSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticlesByFavoritFetch.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default getArticlesByFavoritSlice.reducer;
