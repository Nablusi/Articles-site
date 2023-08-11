import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteArticleFetch = createAsyncThunk('deleteArticleSlice/deleteArticleFetch', 
async({ slug, token})=>{
    const res = await fetch(`https://api.realworld.io/api/articles/${slug}`, 
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

const deleteArticleSlice = createSlice({
    initialState:[], 
    name:'deleteArticleSlice', 
    reducers:{}, 
    extraReducers:(builder)=>{
        builder.addCase(deleteArticleFetch.fulfilled, (state, action)=>{
            return action.payload; 
        })
    }
})

export default deleteArticleSlice.reducer;