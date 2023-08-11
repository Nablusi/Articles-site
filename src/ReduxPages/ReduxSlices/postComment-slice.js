import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postCommentFetch = createAsyncThunk('postCommentSlice/postCommentFetch', 
async({body,slug, token})=>{
    const res = await fetch(`https://api.realworld.io/api/articles/${slug}/comments`, 
    {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            comment: {
            body,
          },
        }),
      })
    const data = await res.json(); 
    return data; 
}
)

const postCommentSlice = createSlice({
    initialState:[], 
    name:'postCommentSlice', 
    reducers:{}, 
    extraReducers:(builder)=>{
        builder.addCase(postCommentFetch.fulfilled, (state, action)=>{
            return action.payload; 
        })
    }
})

export default postCommentSlice.reducer;