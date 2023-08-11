import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const loginFetch = createAsyncThunk(
  "loginSlice/loginFetch",
  async ({ email, password }) => { 
    const res = await fetch("https://api.realworld.io/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    const data = await res.json();
    return data;
  }
);
const loginSlice = createSlice({
  initialState: [],
  name: "loginSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginFetch.fulfilled, (state, action)=>{
        state = action.payload; 
    });
  },
});
export default loginSlice.reducer;
