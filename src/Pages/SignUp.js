import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { signUpFetch } from "../ReduxPages/ReduxSlices/signup-slice";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { condition } from "../ReduxPages/ReduxSlices/condition-slice";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters")
      .max(20, "Username must be at most 20 characters")
      .matches(
        /^[a-zA-Z][a-zA-Z0-9-_]*$/,
        "username can contain alphanumeric characters, hyphens, and underscores"
      ),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
        "Password must contain at least one uppercase letter, one lowercase letter"
      ),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  async function clickHandler(values) {
    try {
      const response = await dispatch(signUpFetch({ values }));
      const signup = response.payload; 
      if (signup.errors && signup.errors.email) {
        setEmailError("email is exist");
      } else if (signup.errors && signup.errors.username) {
        setUsernameError("username is exist");
      } else {
        localStorage.setItem("user-info", JSON.stringify(signup.user));
        localStorage.setItem("jwt", JSON.stringify(signup.user.token));
        dispatch(condition(true))
        console.log(signup.user);
        toast.success('registration completed',{
          position: toast.POSITION.TOP_CENTER
        })
        navigate("/");
      }
    } 
    catch (error) {
      console.error("Error occurred:", error);
    }
  }
  

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    if (!value.trim()) {
      setEmailError("");
      setUsernameError("");
    }
  };
  return (
    <>
      <h2
        className="text-center mt-5"
        style={{ fontSize: "30px", color: "#5CB85C" }}
      >
        {" "}
        Sign Up{" "}
      </h2>
      <Link
        to={"/signin"}
        className="text-center mt-2 haveAnAccount"
        style={{ color: "#5CB85C" }}
      >
        {" "}
        Have An Account{" "}
      </Link>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={clickHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form
            className="container d-flex flex-column justify-content-center align-items-center mt-4 "
            onSubmit={handleSubmit}
          >
            <div className="mb-4 mt-4" style={{ height: "80px", width: "50%" }}>
              <Field
                as={TextField}
                type="text"
                name="username"
                id="username"
                label="Username"
                onChange={(e) => {
                  handleChange(e);
                  handleUsernameChange(e);
                }}
                onBlur={handleBlur}
                value={values.username}
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                style={{ width: "100%" }}
              />

              <Typography component={"h2"} sx={{ color: "red" }}>
                {usernameError}
              </Typography>
            </div>
            <div className="mb-4" style={{ height: "80px", width: "50%" }}>
              <Field
                as={TextField}
                type="email"
                name="email"
                id="email"
                label="Email"
                onChange={(e) => {
                  handleChange(e);
                  handleUsernameChange(e);
                }}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                style={{ width: "100%" }}
              />
              <Typography component={"h2"} sx={{ color: "red" }}>
                {emailError}
              </Typography>
            </div>
            <div className="mb-4" style={{ height: "80px", width: "50%" }}>
              <Field
                as={TextField}
                type="password"
                name="password"
                id="password"
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                style={{ width: "100%" }}
              />
            </div>
            <Typography  component={'div'} sx={{ height: "80px", width:{ md:'50%' } }}>
              <Button
                sx={{
                  color: "#5CB85C",
                  width: "150px",
                  borderColor: "#5CB85C",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  "&:hover": { color: "white", backgroundColor: "#5CB85C" },
                }}
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Typography>
          </Form>
        )}
      </Formik>
    </>
  );
}
