import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const favoritFetch = createAsyncThunk(
  "favoritSlice/favoritFetch",
  async ({ slug, token }) => { 
    const res = await fetch(`https://api.realworld.io/api/articles/${slug}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    return data;
  }
);
const favoritSlice = createSlice({
  initialState: [],
  name: "favoritSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(favoritFetch.fulfilled, (state, action)=>{
        state = action.payload; 
    });
  },
});
export default favoritSlice.reducer;
