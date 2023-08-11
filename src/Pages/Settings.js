import { TextField, useTheme,Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFetch } from "../ReduxPages/ReduxSlices/updateUser-slice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { condition } from "../ReduxPages/ReduxSlices/condition-slice";



export default function Settings() {
  const theme = useTheme();
  const conditionPage = useSelector((state)=>state.condition); 
  const user = conditionPage ? JSON.parse(localStorage.getItem("user-info")) :''; 
  const [image, setImage] = useState(user.image);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio); 
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const token =  conditionPage ? JSON.parse(localStorage.getItem('jwt')) :''; 
  
  

  async function clickHandler(e) {
    e.preventDefault();
    try {
      const res = await dispatch(updateFetch({ image, username, bio, email, password, token }));
      const update = await res.payload;
      if (update?.user) {
        localStorage.setItem("user-info", JSON.stringify(update.user));
        console.log(update.user);
        toast.success(`Information updated successfully,  please sign again`, {
          position: toast.POSITION.TOP_CENTER
        });
        dispatch(condition(false));
        localStorage.removeItem("user-info");
        localStorage.removeItem("jwt");
        localStorage.removeItem("condition");
        navigate('/')
        
      } else if (update?.errors) {
        if (update.errors.includes("Unique constraint failed on the fields: (`username`)")) {
          console.log("username is already in use");
          toast.warning('Username already exist', {
            position: toast.POSITION.TOP_CENTER
          });
        } else {
          console.error('Unhandled server-side error:', update.errors);
        }
      } else {
        console.error('Invalid server response:', update);
          toast.warning('Username or email is already exists', {
            position: toast.POSITION.TOP_CENTER
          });
        
      }
    } catch (error) {
      console.error('Unhandled client-side error:', error);
    }
  }
  return (
    <div className="container ">
      <h2
        className="text-center mt-4"
        style={{ color: theme.palette.mainColor.main }}
      >
        Your Settings
      </h2>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div style={{width:"70%", height:'100px'}}>
          <label htmlFor="image" className="mb-2" style={{color:theme.palette.mainColor.text}}> Image </label>
          <TextField id="image" 
          onChange={(e)=>{setImage(e.target.value)}}
          value={image}
          sx={{width:'100%'}}/>
        </div>
        <div style={{width:"70%", height:'100px'}}>
          <label htmlFor="username" className="mb-2 mt-3" style={{color:theme.palette.mainColor.text}}> Username </label>
          <TextField type="text" id="username"  
          onChange={(e)=>{setUsername(e.target.value)}}
          value={username}
          sx={{width:'100%'}}/>
        </div>
        <div style={{width:"70%", height:'100px'}}>
          <label htmlFor="bio" className="mb-2 mt-3" style={{color:theme.palette.mainColor.text}}> Bio </label>
          <TextField type="text" id="bio" multiline rows={5}  
          onChange={(e)=>{setBio(e.target.value)}}
          value={bio}
          sx={{width:'100%'}}/>
        <div style={{height:'100px'}}>
          <label htmlFor="email" className="mb-2 mt-3" style={{color:theme.palette.mainColor.text}}> Email </label>
          <TextField id="email" type="email" 
          onChange={(e)=>{setEmail(e.target.value)}}
          value={email}
          sx={{width:'100%'}}/>
          
        </div>
        <div style={{height:'100px'}}>
          <label htmlFor="password" className="mb-2 mt-3" style={{color:theme.palette.mainColor.text}}> Password </label>
          <TextField id="password" type="password" placeholder="New Password"  
          onChange={(e)=>{setPassword(e.target.value)}}
          value={password}
          sx={{width:'100%'}}/>
        </div>
        <Button
            type="submit"
            onClick={(e)=>{clickHandler(e)}}
            sx={{
              mt: "20px",
              width: "200px",
              mb:'20px',
              color: theme.palette.mainColor.text,
              backgroundColor: theme.palette.mainColor.main,
              "&:hover": {
                backgroundColor: "#ffffff",
                color: theme.palette.mainColor.main,
              },
            }}
          >
            update settings
          </Button>   
        </div>
      </div>
    </div>
  );
}
