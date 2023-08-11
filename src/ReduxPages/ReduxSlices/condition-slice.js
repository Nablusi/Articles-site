import { createSlice } from "@reduxjs/toolkit";

const conditionSlice = createSlice({
    initialState:false, 
    name:'conditionSlice', 
    reducers:{
        condition:(state,action)=>{
            return action.payload
        }
    }
})

export const { condition } = conditionSlice.actions;
export default conditionSlice.reducer;
