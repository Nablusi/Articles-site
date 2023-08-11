import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getArticlesByUsernameFetch = createAsyncThunk(
  "getArticlesByUsernameSlice/getArticlesByUsernameFetch",
  async ({username, pageNumber, token}) => {
    const res = await fetch(`https://api.realworld.io/api/articles?author=${username}&offset=${pageNumber}`, {
      method:"GET", 
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
    }); 
    const data = await res.json(); 
    return data; 
  });


const getArticlesByUsernameSlice = createSlice({
  name: "getArticlesByUsernameSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticlesByUsernameFetch.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default getArticlesByUsernameSlice.reducer;
