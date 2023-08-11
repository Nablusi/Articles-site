import { Avatar, IconButton, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { profileFetch } from "../ReduxPages/ReduxSlices/profile-slice";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { followFetch } from "../ReduxPages/ReduxSlices/followUser-slice";
import { unFollowFetch } from "../ReduxPages/ReduxSlices/unfollow-slice";
import DoneIcon from '@mui/icons-material/Done';
import FeedArticles from "../components/FeedArticles/FeedArticles";
import { feddFetch } from "../ReduxPages/ReduxSlices/getFeedArticles-slice";
import { getArticlesByUsernameFetch } from "../ReduxPages/ReduxSlices/getArticlesByUserName";
import { getArticlesByFavoritFetch } from "../ReduxPages/ReduxSlices/getArticlesByFavorit";
import ProfilePagination from "../components/pagination/ProfilePagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function Profile() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { username } = useParams();
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();  
  const [appearMyArticles, setAppearMyArticles] = useState(true); 
  const [appearMyFavoritArticles, setAppearMyFavoritArticles] = useState(false);
  const feedARticles = useSelector((state)=>state.feedArticle);
  const getArticlesByUserName = useSelector((state)=>state.getArticlesByUserName);
  const getArticlesByFavorit = useSelector((state)=>state.getArticlesByFavorit);
  const [pageNumber, setPageNumber] = useState(0); 
  const numberOfArticlePerPage = 5; 
  const condition = useSelector((state)=>state.condition);   
  const usernameProfile = profile.username; 
  const token = condition ? JSON.parse(localStorage.getItem('jwt')) :''; 
  const user = condition ? JSON.parse(localStorage.getItem("user-info")): ''; 
  const totalNumberOfArticles = user.username === usernameProfile && appearMyArticles ? feedARticles.articlesCount :  appearMyArticles ? getArticlesByUserName.articlesCount : getArticlesByFavorit.articlesCount; 
  let numberOfPages = Math.round(totalNumberOfArticles / numberOfArticlePerPage); 
  
  useEffect(() => {
    dispatch(profileFetch({ username, token }));
  }, [username]);
 
  // if(!profile || profile.image ||profile.username){
  //   return <p>loading...</p>
  // }

  console.log(pageNumber)

  function clickhandeler(){
    if(condition){
      if(profile.following === true) {
        dispatch(unFollowFetch({username, token})).then(()=>{
          dispatch(profileFetch({ username, token }));
        })
        navigate(`/profile/${username}`)
      } else {
        dispatch(followFetch({username, token} )).then(()=>{
          dispatch(profileFetch({ username, token }));
        })
        navigate(`/profile/${username}`)
      }

    } else{
      toast.warning(
        <p className="text-center mt-3 " style={{ color: "black" }}>
          Please
          <a
            href="/signin"
            style={{
              color: theme.palette.mainColor.main,
              textDecoration: "none",
            }}
          >
            <span className="ms-2">Sign In</span>
          </a>
          <span className="ps-2 pe-2">or</span>
          <a
            href="/signup"
            style={{
              color: theme.palette.mainColor.main,
              textDecoration: "none",
            }}
          >
            <span className="pe-2">Sign Up</span>
          </a>
          to follow { username }
        </p>,
        {
          position: toast.POSITION.TOP_CENTER,
          style: { height: "150px", width: "500px" },
        }
      );
    }


  }



  function myArticlesBtn(){
    setAppearMyArticles(true);
    setAppearMyFavoritArticles(false);
    dispatch(feddFetch({token , pageNumber}));
    dispatch(getArticlesByUsernameFetch({username, pageNumber, token})); 

  }

  useEffect(()=>{
    if(appearMyArticles){
      dispatch(getArticlesByUsernameFetch({username, pageNumber, token})); 
      dispatch(feddFetch({token , pageNumber}));
    } else{
      dispatch(getArticlesByFavoritFetch({username, pageNumber, token}))  
    }
  },[pageNumber, username])


  function myFavoritArticles(){
    setAppearMyArticles(false);
    setAppearMyFavoritArticles(true);
    dispatch(getArticlesByFavoritFetch({username, pageNumber, token}))  
  }

  return (
    <div>
      <Typography
        component={"div"}
        className="background"
        sx={{
          width: "100%",
          height: "350px",
          backgroundColor: theme.palette.mainColor.main,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar
          sx={{ width: "100px", height: "100px" }}
          src={profile.image}
          alt=""
        />
        <Typography
          component={"h2"}
          sx={{
            color: theme.palette.mainColor.text,
            fontSize: "30px",
            textTransform: "capitalize",
            mt: "10px",
          }}
        >
          {profile.username}
        </Typography>
        <Typography
          component={"p"}
          sx={{
            color: theme.palette.mainColor.text,
            fontSize: "20px",
            mt: "10px",
          }}
        >
          {profile.bio}
        </Typography>
        <div className="w-100 container d-flex justify-content-end">
          {user.username === profile.username ? (
            <Link
              className="btn rounded-pill border d-flex align-items-center"
              to="/settings"
              style={{
                color: theme.palette.mainColor.text,
                fontSize: "20px",
                mt: "10px",
                textDecoration: "none",
                width: "150px",
              }}
            >
              <IconButton>
                <SettingsIcon />
              </IconButton>
              Settings
            </Link>
          ) : (
            profile.following === false ?
            <div className="btn d-flex align-items-center rounded-pill border" >
              <IconButton onClick={clickhandeler} >
                <AddIcon />
                follow {username}
              </IconButton>
            </div>
            : 
            <div className="btn d-flex align-items-center rounded-pill border" >
            <IconButton onClick={clickhandeler} >
              <DoneIcon />
              followd {username}
            </IconButton>
          </div>
          )}
        </div>
      </Typography>
      <div className="container mt-4">
        <div className="d-flex align-items-center flex-row mb-4">
        <button className="btn rounded-0" style={{color:theme.palette.mainColor.main , borderBottom: appearMyArticles ? 'green 1px solid' :'' }} onClick={myArticlesBtn}>
             {user.username === usernameProfile ? "My Articles" : ` ${username} Articles` }
        </button>
        <button className="btn rounded-0" style={{color:theme.palette.mainColor.main,  borderBottom: appearMyFavoritArticles ? 'green 1px solid' :''}} onClick={myFavoritArticles} >
        {user.username === usernameProfile ? "Favorite Articles" : ` ${username} Favorite Articles` }
        </button>
        </div>

        <FeedArticles  getArticlesByFavoritFetch ={getArticlesByFavoritFetch}  getArticlesByUsernameFetch ={getArticlesByUsernameFetch} usernameProfile ={usernameProfile} appearMyArticles={appearMyArticles}  getArticlesByFavorit={getArticlesByFavorit}  getArticlesByUserName={getArticlesByUserName} pageNumber={pageNumber} feddFetch={feddFetch} feedARticles={feedARticles} condition={condition} />
        {
          totalNumberOfArticles > 5 ? 
          <ProfilePagination    numberOfPages ={numberOfPages}  setPageNumber={setPageNumber}  pageNumber ={pageNumber} /> :''
        }
      </div>
    </div>
  );
}
