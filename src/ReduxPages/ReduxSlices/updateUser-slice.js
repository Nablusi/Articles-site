import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateFetch = createAsyncThunk('updateSlice/updateFetch', 
async({image, username, bio, email, password, token})=>{
    const res = await fetch('https://api.realworld.io/api/user', 
    {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify(
          {
            user: {
            email,
            username,
            bio,
            image,
            password,
          },
        }),
      })
    const data = await res.json();
    return data; 
}
)

const updateSlice = createSlice({
    initialState:[], 
    name:'updateSlice', 
    reducers:{}, 
    extraReducers:(builder)=>{
        builder.addCase(updateFetch.fulfilled, (state, action)=>{
            return action.payload; 
        })
    }
})

export default updateSlice.reducer;