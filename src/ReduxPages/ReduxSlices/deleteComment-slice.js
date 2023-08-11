import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteCommentFetch = createAsyncThunk('deleteCommentSlice/deleteCommentFetch', 
async({ slug, id, token})=>{
    const res = await fetch(`https://api.realworld.io/api/articles/${slug}/comments/${id}`, 
    {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
        }),
      })
    const data = await res.json();
    return data; 
}
)

const deleteCommentSlice = createSlice({
    initialState:[], 
    name:'deleteCommentSlice', 
    reducers:{}, 
    extraReducers:(builder)=>{
        builder.addCase(deleteCommentFetch.fulfilled, (state, action)=>{
            return action.payload; 
        })
    }
})

export default deleteCommentSlice.reducer;