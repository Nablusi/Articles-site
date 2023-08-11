import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTagFetch = createAsyncThunk(
  "getArticleByTagSlice/getTagFetch",
  async ({tag, pageNumber, token}) => {
    const res = await fetch(`https://api.realworld.io/api/articles/?tag=${tag}&offset=${pageNumber}`,{
      method:'GET', 
      headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
      }
    }); 
    const data = await res.json(); 
    return data; 
  });


const getArticleByTagSlice = createSlice({
  name: "getArticleByTagSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTagFetch.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default getArticleByTagSlice.reducer;
