import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const unfavoritFetch = createAsyncThunk(
  "unFavoritSlice/unfavoritFetch",
  async ( {slug, token} ) => {
    const res = await fetch(
      `https://api.realworld.io/api/articles/${slug}/favorite`,
      {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          },
        body: JSON.stringify({
          profile: {},
        }),
      }
    );
    const data = await res.json();
    return data;
  }
);

const unFavoritSlice = createSlice({
  initialState: [],
  name: "unFavoritSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(unfavoritFetch.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(unfavoritFetch.rejected, (state, action) => {
        console.error("API request failed:", action.error);
        return state;
      });
  },
});

export default unFavoritSlice.reducer;
