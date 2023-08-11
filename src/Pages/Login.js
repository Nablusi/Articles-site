import { Button, Container, TextField, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginFetch } from "../ReduxPages/ReduxSlices/login-slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { condition } from "../ReduxPages/ReduxSlices/condition-slice";



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
  async function submitHandeler(e){
    try{
        e.preventDefault(); 
        const res = await dispatch(loginFetch({email, password}));
        const login = res.payload;
        if (login.errors) {
            setError("email or password is incorrect");
            console.log(`email or password is incorrect`);
            toast.warning('email or password is incorrect',{
                position: toast.POSITION.TOP_CENTER
            }) 
          } else {
            localStorage.setItem("user-info", JSON.stringify(login.user));
            localStorage.setItem("jwt", JSON.stringify(login.user.token));
            dispatch(condition(true))
            console.log(login.user);
            toast.success('login successful',{
                position: toast.POSITION.TOP_CENTER
              })
            navigate("/");
          } 
    } catch(error){
        console.error("Error occurred:", error);
    }
  }


  return (
    <Container component={"div"}>
      <h2 className="text-center mt-5" style={{ color: "#5CB85C" }}>
        Sign In
      </h2>
      <form className="box d-flex justify-content-center align-items-center flex-column" 
      onSubmit={(e)=>submitHandeler(e)} >
        <Link
          to="/signup"
          className="btn needAnAccount"
          style={{ color: "#5CB85C" }}
        >
          Need An Account
        </Link>
        <TextField
          variant="outlined"
          label="email"
          id="email"
          sx={{ height: "80px", mt: "40px", width: "50%" }}
          onChange={(e)=>{setEmail(e.target.value)}}

        />
        <TextField
          variant="outlined"
          type="password"
          label="password"
          id="password"
          sx={{ height: "80px", mt: "20px", width: "50%" }}
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <Typography
          component={"div"}
          sx={{ height: "80px", width: { md: "50%" } }}
        >
          <Button
            className="btn"
            type="submit"
            sx={{
              color: "#5CB85C",
              width: "150px",
              borderColor: "#5CB85C",
              borderWidth: "1px",
              borderStyle: "solid",
              "&:hover": { color: "white", backgroundColor: "#5CB85C" },
            }}
          >
            Login
          </Button>
        </Typography>
      </form>
    </Container>
  );
}
