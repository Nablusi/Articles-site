import { Button, Paper, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tagFetch } from "../../ReduxPages/ReduxSlices/tags-slice";


export default function Tags(props){
    const theme = useTheme();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(tagFetch()); 
    },[]); 


    const tags = useSelector((state)=>state.tags);
    if (!Array.isArray(tags)) {
        return null; 
    }
    
    let GettingTags = tags.map((tag)=>
        <Button onClick={()=> props.tagsFilter(tag)} className="btn rounded-pill" sx={{backgroundColor:theme.palette.mainColor.background, color:theme.palette.mainColor.text, m:'5px'}} key={tag}>{tag}</Button>
    )
    return (
        <Paper sx={{p:'10px'}} elevation={3}>
            {GettingTags}
        </Paper>
    )
}