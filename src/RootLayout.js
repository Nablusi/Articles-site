import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import SideBar from "./components/Header/SideBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export default function RootLayout() {
  const [open, setOpen] = useState(false); 
  const [mode, setMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "light"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );

  function darkMode() {
    setMode(mode === "light" ? "dark" : "light");
  }
  function openToggle(){
    setOpen(open === false ? true : false); 
  }
  

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            mainColor:{
              main:'#5CB85C',
              text:'#373A3C',
              background:'#EBEBEB',
            }
          }
        : {
          mainColor:{
            main:'#5CB85C',
            text:'#ffffff',
            background:'#929292',
          }
          }),
    },
  });
  useEffect(() => {
    localStorage.setItem("currentMode", mode);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} mode={mode} setMode={setMode} openToggle = {openToggle} />
      <SideBar openToggle = {openToggle} open = {open} darkMode={darkMode} mode={mode} />
      <CssBaseline />
    </ThemeProvider>
  );
}
