import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { condition } from "../../ReduxPages/ReduxSlices/condition-slice";
import { useDispatch, useSelector } from "react-redux";

export default function AppBarR(props) {
  const dispatch = useDispatch();
  const pages = ["Home", "Sign In", "sign Up"];
  const pagesHref = ["/", "/signin", "/signup"];
  const location = useLocation();
  const theme = useTheme();
  const logInPages = ["Home", "New Post", "Settings"];
  const logInPagesHref = ["/", "/newpost", `/settings`];
  const conditionPage = useSelector((state) => state.condition);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-info"));
  useEffect(() => {
    if (user) {
      dispatch(condition(true));
    }
  }, []);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Container>
        <Toolbar disableGutters>
          <IconButton
            aria-label=""
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => {
              props.openToggle();
              localStorage.setItem("current value", props.mode);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              style={{
                color: theme.palette.mainColor.main,
                textDecoration: "none",
                fontSize: "25px",
              }}
            >
              Conduit
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <IconButton
              onClick={() => {
                props.darkMode();
              }}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon sx={{ color: "orange" }} />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            {conditionPage
              ? logInPages.map((page, index) => (
                  <Link
                    to={logInPagesHref[index]}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.mainColor.main,
                      backgroundColor:
                        location.pathname === pagesHref[index]
                          ? theme.palette.mainColor.background
                          : "",
                    }}
                    key={page}
                  >
                    <Typography
                      className="btn"
                      component={"h2"}
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        p: "10px",
                        color: theme.palette.mainColor.text,
                      }}
                    >
                      {page}
                    </Typography>
                  </Link>
                ))
              : pages.map((page, index) => (
                  <Link
                    to={pagesHref[index]}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.mainColor.main,
                      backgroundColor:
                        location.pathname === pagesHref[index]
                          ? theme.palette.mainColor.background
                          : "",
                    }}
                    key={page}
                  >
                    <Typography
                      className="btn"
                      component={"h2"}
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        p: "10px",
                        color: theme.palette.mainColor.text,
                      }}
                    >
                      {page}
                    </Typography>
                  </Link>
                ))}
            {conditionPage ? (
              <>
                <Link to={`/profile/${user.username}`}>
                  <Avatar src={user.image} alt=''/>
                </Link>
                <IconButton
                  onClick={() => {
                    dispatch(condition(false));
                    console.log("condition set to false");
                    localStorage.removeItem("user-info");
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("condition");
                    navigate('/')
                    toast.success('signout successfully comeback soon :)',{
                      position: toast.POSITION.TOP_CENTER
                    })
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              ""
            )}
          </Box>
        </Toolbar>
      </Container>
      <Outlet />
    </AppBar>
  );
}
