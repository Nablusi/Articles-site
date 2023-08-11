import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const followFetch = createAsyncThunk(
  "followSlice/followFetch",
  async ( {username, token} ) => {
    const res = await fetch(
      `https://api.realworld.io/api/profiles/${username}/follow`,
      {
        method: "POST",
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

const followSlice = createSlice({
  initialState: [],
  name: "followSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followFetch.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(followFetch.rejected, (state, action) => {
        console.error("API request failed:", action.error);
        return state;
      });
  },
});

export default followSlice.reducer;
