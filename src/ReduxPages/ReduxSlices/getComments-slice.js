import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCommentsFetch = createAsyncThunk(
  "getCommentsSlice/getCommentsFetch",
  async ({slug, token}) => {
    const res = await fetch(`https://api.realworld.io/api/articles/${slug}/comments`,{method:"GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },

}); 
    const data = await res.json(); 
    return data; 
  });


const getCommentsSlice = createSlice({
  name: "getCommentsSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentsFetch.pending, (state) => {
      console.log("Fetching comments...");
    });
    builder.addCase(getCommentsFetch.fulfilled, (state, action) => {
      console.log("Fetched comments:", action.payload);
      return action.payload;
    });
    builder.addCase(getCommentsFetch.rejected, (state, action) => {
      console.error("Failed to fetch comments:", action.error);
    });
  },
});

export default getCommentsSlice.reducer;
