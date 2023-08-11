import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateArticleFetch = createAsyncThunk('updateArticleSlice/updateArticleFetch', 
async({title, description, body, slug, token})=>{
    const res = await fetch(`https://api.realworld.io/api/articles/${slug}`, 
    {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            article: {
                title,
                description,
                body,
          },
        }),
      })
    const data = await res.json();
    return data; 
}
)

const updateArticleSlice = createSlice({
    initialState:[], 
    name:'updateArticleSlice', 
    reducers:{}, 
    extraReducers:(builder)=>{
        builder.addCase(updateArticleFetch.fulfilled, (state, action)=>{
            return action.payload; 
        })
    }
})

export default updateArticleSlice.reducer;