import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postFetch = createAsyncThunk('postSlice/postFetch', 
async({title, description, body, tagList, token})=>{
    const res = await fetch('https://api.realworld.io/api/articles', 
    {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            article: {
            title,
            description,
            body,
            tagList, 
          },
        }),
      })
    const data = await res.json(); 
    return data; 
}
)

const postSlice = createSlice({
    initialState:[], 
    name:'postSlice', 
    reducers:{}, 
    extraReducers:(builder)=>{
        builder.addCase(postFetch.fulfilled, (state, action)=>{
            return action.payload; 
        })
    }
})

export default postSlice.reducer;