import { TextField, useTheme, Button } from "@mui/material";
import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateArticleFetch } from "../ReduxPages/ReduxSlices/updateArticle-slice";
import { slugFetch } from "../ReduxPages/ReduxSlices/slug-slice";
import { useEffect } from "react";


export default function UpdateSlug(){
    const theme = useTheme();
    const slugRe = useSelector((state)=>state.slug);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { slug } = useParams(); 
    const token = JSON.parse(localStorage.getItem('jwt'));
    
        useEffect(()=>{
            dispatch(slugFetch(slug))
        },[])
    
    const titleR = slugRe.title; 
    
    
    const [title, setTitle] = useState(titleR); 
    const [description, setDescription] = useState(slugRe.description);  
    const [body, setBody] = useState(slugRe.body);


    function clickHandeler(e){
        e.preventDefault(); 
        dispatch(updateArticleFetch({title, description, body,slug , token }));
        dispatch(slugFetch(slug))
        navigate(`/`)
    }


    return(
        <div className="container">
            <h2 className="text-center" style={{color:theme.palette.mainColor.main}}>Update Article</h2>
            <div className="d-flex justify-content-center align-items-center mt-2 flex-column">
            <div style={{ height: "80px", width: "70%" }}>
          <TextField
            variant="outlined"
            label="Article Title"
            type="text"
            id="title"
            sx={{ mt: "30px", width: "100%" }}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div style={{ height: "80px", width: "70%" }}>
          <TextField
            variant="outlined"
            label="description"
            type="text"
            id="description"
            sx={{ mt: "30px", width: "100%" }}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </div>
        <div style={{ height: "80px", width: "70%" }}>
          <TextField
            id="body"
            label="body"
            multiline
            rows={6}
            variant="outlined"
            sx={{ mt: "30px", width: "100%" }}
            onChange={(e)=>setBody(e.target.value)}
          />

          <Button
            type="submit"
            onClick={(e)=>{clickHandeler(e)}}
            sx={{
              mt: "20px",
              width: "150px",
              color: theme.palette.mainColor.text,
              backgroundColor: theme.palette.mainColor.main,
              "&:hover": {
                backgroundColor: "#ffffff",
                color: theme.palette.mainColor.main,
              },
            }}
          >
            Update
          </Button>
        </div>


            </div>
        </div>
    )
}