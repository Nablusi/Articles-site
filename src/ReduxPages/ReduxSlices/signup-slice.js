import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUpFetch = createAsyncThunk(
  "signUpSlice/signUpFetch",
  async ({values}) => {
    const { username, email, password } = values;
    const res = await fetch(`https://api.realworld.io/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    });
    const data = await res.json();
    // console.log(data.user.token);
    return data;
  }
);


const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpFetch.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default signUpSlice.reducer;
