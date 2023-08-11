import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const unFollowFetch = createAsyncThunk(
  "unFollowSlice/unFollowFetch",
  async ( {username, token} ) => {
    const res = await fetch(
      `https://api.realworld.io/api/profiles/${username}/follow`,
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

const unFollowSlice = createSlice({
  initialState: [],
  name: "unFollowSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(unFollowFetch.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(unFollowFetch.rejected, (state, action) => {
        console.error("API request failed:", action.error);
        return state;
      });
  },
});

export default unFollowSlice.reducer;
