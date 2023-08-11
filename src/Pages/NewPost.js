import { TextField, Typography, useTheme, Button } from "@mui/material";
import React,{useState} from "react";
import { useNavigate } from "react-router";
import { postFetch } from "../ReduxPages/ReduxSlices/postArticle-slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState('');  
  const [body, setBody] = useState(''); 
  const [tagList, setTags] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('jwt'))

  async function clickHandeler(e){
    e.preventDefault(); 
    try{
        const res = await dispatch(postFetch({title, description,body,tagList, token}));
        const newPost = res.payload;
        if (newPost.errors) {
            toast.warning(' ops something wroing happen',{
                position: toast.POSITION.TOP_CENTER
            }) 
          } else {
            console.log(newPost);
            toast.success('article has successfully posted ',{
                position: toast.POSITION.TOP_CENTER
              })
            navigate("/");
          } 
        console.log(title);
        console.log(description);
        console.log(body);

    } catch(error){
        console.error("Error occurred:", error);
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center mt-2 flex-column">
        <Typography
          component={"h2"}
          sx={{
            color: theme.palette.mainColor.main,
            fontSize: "30px",
            mt: "30px",
          }}
        >
          Add An Article
        </Typography>
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

          <TextField
            id="Tags"
            label="Tags"
            variant="outlined"
            sx={{ mt: "30px", width: "100%" }}
            onChange={(e)=>setTags(e.target.value.split(" "))}
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
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
