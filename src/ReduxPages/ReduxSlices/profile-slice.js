import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const profileFetch = createAsyncThunk('profileSlice/profileFetch', 
async({token, username})=>{
    const res = await fetch(`https://api.realworld.io/api/profiles/${username}`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          },
    })
    const data = await res.json(); 
    return data.profile; 
}
)

const profileSlice = createSlice({
    initialState:[], 
    name:'profileSlice', 
    reducers:{}, 
    extraReducers:(builder)=>{
        builder.addCase(profileFetch.fulfilled, (state, action)=>{
            return action.payload; 
        })
    }
})

export default profileSlice.reducer;