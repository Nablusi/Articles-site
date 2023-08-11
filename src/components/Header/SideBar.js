import React, {useEffect} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {
    Drawer,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    List,
    Divider,
    IconButton,
    useTheme,
    Avatar,
  } from "@mui/material";
  import { Link, useLocation } from "react-router-dom";
  import HomeIcon from "@mui/icons-material/Home";
  import HowToRegIcon from "@mui/icons-material/HowToReg";
  import LoginIcon from "@mui/icons-material/Login";
  import { condition } from "../../ReduxPages/ReduxSlices/condition-slice";
  import { useSelector, useDispatch } from "react-redux";
  import SettingsIcon from "@mui/icons-material/Settings";
  import ArticleIcon from "@mui/icons-material/Article";
  import LogoutIcon from "@mui/icons-material/Logout";
import {  useNavigate, } from "react-router-dom";

export default function SideBar(props){
    const theme = useTheme();
    const location = useLocation();
    const pages = ["Home", "Sign In", "sign Up"];
    const logInPages = ["Home", "New Post", "Settings"];
    const pagesHref = ["/", "/signin", "/signup"];
    const logInPagesHref = ["/", "/newpost", `/settings`];
    const arrayIcons = [<HomeIcon />, <LoginIcon />, <HowToRegIcon />];
    const dispatch = useDispatch();
    const conditionsPage = useSelector((state) => state.condition);
    const arrayIconsLogin = [<HomeIcon />, <ArticleIcon />, <SettingsIcon />];
    const user = JSON.parse(localStorage.getItem("user-info"));
    const navigate = useNavigate();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user-info"));
      if (user) {
        dispatch(condition(true));
      }
    }, []);

    return(
      <Drawer
        variant="temporary"
        open={props.open}
        onClose={props.openToggle}
        sx={{ width: "240px", display: { xs: "flex", md: "none" } }}
      >
        <List sx={{ width: "240px", flexDirection: "column", justifyContent:"center" }}>
          <div className="text-center" style={{width:'100%'}}>
          <IconButton 
            onClick={() => {
              localStorage.setItem(
                "currentMode",
                theme.palette.mode === "light" ? "dark" : "light"
              );
              props.darkMode();
            }}
          >
            {props.mode === "light" ? (
              <Brightness4Icon />
            ) : (
              <Brightness7Icon sx={{ color: "orange" }} />
            )}
          </IconButton>
          </div>
          <Divider />
            {conditionsPage ? 
             <Link to={`/profile/${user.username}`} style={{textDecoration:'none'}}>
              <ListItem disablePadding>
                <ListItemButton>
                 <Avatar src={user.image} sx={{width:'25px', height:'25px', mr:'20px'}} alt=""/>
                 <ListItemText primary='profile' sx={{color:theme.palette.mainColor.text}} />
                </ListItemButton>
              </ListItem>
             </Link>
             :''
            }
           {conditionsPage
            ? logInPages.map((page, index) => (
                <Link
                  to={logInPagesHref[index]}
                  style={{ textDecoration: "none", color:theme.palette.mainColor.text }}
                  key={page}
                >
                  <ListItem
                    disablePadding
                    sx={{
                      backgroundColor:
                        location.pathname === logInPagesHref[index]
                          ? theme.palette.mainColor.background
                          : "",
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>{arrayIconsLogin[index]}</ListItemIcon>
                      <ListItemText primary={page} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))
            : 
            pages.map((page, index) => (
              <Link
                to={pagesHref[index]}
                style={{ textDecoration: "none" , color: theme.palette.mainColor.text }}
                key={page}
              >
                <ListItem
                  disablePadding
                  sx={{
                    backgroundColor:
                      location.pathname === pagesHref[index] ? theme.palette.mainColor.background : "",
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>{arrayIcons[index]}</ListItemIcon>
                    <ListItemText primary={page}  />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
              
              }
          {conditionsPage ? (
            <>
            <ListItemButton  onClick={() => {
                  dispatch(condition(false));
                  console.log("condition set to false");
                  localStorage.removeItem("user-info");
                  localStorage.removeItem("jwt");
                  localStorage.removeItem("condition");
                  navigate('/')
                  toast.success('signout successfully comeback soon :)',{
                    position: toast.POSITION.TOP_CENTER
                  })
                }}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='logout' />
            </ListItemButton>
            </>
          ) : (
            ""
          )} 
        </List>
      </Drawer>
    )
    
}
