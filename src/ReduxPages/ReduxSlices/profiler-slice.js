import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const profilerFetch = createAsyncThunk('profilerSlice/profilerFetch', 
async({username})=>{
    const res = await fetch(`https://api.realworld.io/api/profiles/${username}`)
    const data = await res.json(); 
    return data.profile; 
}
)

const profilerSlice = createSlice({
    initialState:[], 
    name:'profilerSlice', 
    reducers:{}, 
    extraReducers:(builder)=>{
        builder.addCase(profilerFetch.fulfilled, (state, action)=>{
            return action.payload; 
        })
    }
})

export default profilerSlice.reducer;