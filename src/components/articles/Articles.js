import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";
import { favoritFetch } from "../../ReduxPages/ReduxSlices/favoritArticle-slice";
import { useDispatch } from "react-redux";
import { unfavoritFetch } from "../../ReduxPages/ReduxSlices/unfavoritArticle-slice";

export default function Articles(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = props.token; 
  const pageNumber = props.pageNumber;
  const tag = props.tag; 
  

  if (!Array.isArray(props.getArticlesForCard)) {
    return (
      <p
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ color: theme.palette.mainColor.text }}
      >
        {
          <HashLoader
            color="#2bd75c"
            cssOverride={{}}
            loading
            size={100}
            speedMultiplier={2}
          />
        }{" "}
        <p style={{ color: theme.palette.mainColor.main }}>loading ...</p>
      </p>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  function clickHandeler() {
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
        to like this article
      </p>,
      {
        position: toast.POSITION.TOP_CENTER,
        style: { height: "150px", width: "500px" },
      }
    );
  }
  
  console.log(props.globalAppear)

  function clickHandelerFav(slug){
    if(props.apppear){
      dispatch(favoritFetch({ slug , token})).then(()=>{
        dispatch(props.getTagFetch({tag , token}))
      })
    } else if(props.globalAppear){
      dispatch(favoritFetch({ slug , token})).then(()=>{
        dispatch(props.getArticlesByPageFetch({pageNumber, token}))
      })
    } else{
      dispatch(favoritFetch({ slug , token})).then(()=>{
        dispatch(props.feddFetch({token, pageNumber}))
      })
    }
  }

  function unFavoritArticle(slug){
    if(props.apppear){
      dispatch(unfavoritFetch({ slug , token})).then(()=>{
        dispatch(props.getTagFetch({tag , token}))
      })
    } else if(props.globalAppear){
      dispatch(unfavoritFetch({ slug , token})).then(()=>{
        dispatch(props.getArticlesByPageFetch({pageNumber, token}))
      })
    } else{
      dispatch(unfavoritFetch({ slug , token})).then(()=>{
        dispatch(props.feddFetch({token, pageNumber}))
      })
    }
  }




  let articleMapping = props.getArticlesForCard.map((article) => (
    <Card
      elevation={3}
      key={article.slug}
      sx={{ position: "relative", pb: "20px", mb: "20px" }}
    >
      <Link
        to={`/profile/${article.author.username}`}
        style={{ color: theme.palette.mainColor.main, textDecoration: "none" }}
      >
        <CardHeader
          avatar={<Avatar src={article.author.image} alt="m" />}
          title={article.author.username}
          subheader={formatDate(article.createdAt)}
        />
      </Link>
      <Link
        to={`/${article.slug}`}
        style={{ color: theme.palette.mainColor.main, textDecoration: "none" }}
      >
        <CardContent>
          <Typography component={"p"}>{article.title}</Typography>
          <Typography
            className="webkitBox"
            component={"p"}
            color="text.secondary"
          >
            {article.body}
          </Typography>
        </CardContent>
        <div className="text-end me-5">
          {article.tagList.map((tag) => (
            <Button
              className="btn rounded-pill ms-2"
              sx={{
                color: theme.palette.mainColor.text,
                backgroundColor: theme.palette.mainColor.background,
              }}
              key={tag}
            >
              {tag}
            </Button>
          ))}
        </div>
      </Link>
      <IconButton
        aria-label="add to favorites"
        sx={{ position: "absolute", top: "10px", right: "10px", color: article.favorited ? 'green' : '' }}
        onClick = {props.conditionPage ? article.favorited ? ()=>unFavoritArticle(article.slug) : ()=>clickHandelerFav(article.slug)  : clickHandeler}
        
      >
        <span style={{ fontSize: "16px" }}>{article.favoritesCount}</span>
        <FavoriteIcon sx={{color: article.favorited ? 'green' : ''}} />
      </IconButton>
    </Card>
  ));

  let filterTags = props.getArticleByTag.articles
    ? props.getArticleByTag.articles.map((article) => (
        <Card
          elevation={3}
          key={article.slug}
          sx={{ position: "relative", pb: "20px", mb: "20px" }}
        >
          <Link
            to={`/profile/${article.author.username}`}
            style={{
              color: theme.palette.mainColor.main,
              textDecoration: "none",
            }}
          >
            <CardHeader
              avatar={<Avatar src={article.author.image} alt="m" />}
              title={article.author.username}
              subheader={formatDate(article.createdAt)}
            />
          </Link>
          <Link
            to={`/${article.slug}`}
            style={{
              color: theme.palette.mainColor.main,
              textDecoration: "none",
            }}
          >
            <CardContent>
              <Typography component={"p"}>{article.title}</Typography>
              <Typography
                className="webkitBox"
                component={"p"}
                color="text.secondary"
              >
                {article.body}
              </Typography>
            </CardContent>
            <div className="text-end me-5">
              {article.tagList.map((tag) => (
                <Button
                  className="btn rounded-pill ms-2"
                  sx={{
                    color: theme.palette.mainColor.text,
                    backgroundColor: theme.palette.mainColor.background,
                  }}
                  key={tag}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </Link>
          <IconButton
            aria-label="add to favorites"
            sx={{ position: "absolute", top: "10px", right: "10px", color: article.favorited ? 'green' : '' }}
            onClick = {props.conditionPage ? article.favorited ? ()=>unFavoritArticle(article.slug) : ()=>clickHandelerFav(article.slug)  : clickHandeler}

          >
            <span style={{ fontSize: "16px" }}>{article.favoritesCount}</span>
            <FavoriteIcon sx={{color: article.favorited ? 'green' : ''}} />
          </IconButton>
        </Card>
      ))
    : null;

  return (
    <>
      {props.conditionPage ? (
        props.apppear ? (
          <>{filterTags}</>
        ) : (
          props.feedAppear ? 
           <>   
           {
             props.feed.articles  ? (
              props.feed.articles.map((article) => (
                <Card
                  elevation={3}
                  key={article.slug}
                  sx={{ position: "relative", pb: "20px", mb: "20px" }}
                >
                  <Link
                    to={`/profile/${article.author.username}`}
                    style={{
                      color: theme.palette.mainColor.main,
                      textDecoration: "none",
                    }}
                  >
                    <CardHeader
                      avatar={<Avatar src={article.author.image} alt="m" />}
                      title={article.author.username}
                      subheader={formatDate(article.createdAt)}
                    />
                  </Link>
                  <Link
                    to={`/${article.slug}`}
                    style={{
                      color: theme.palette.mainColor.main,
                      textDecoration: "none",
                    }}
                  >
                    <CardContent>
                      <Typography component={"p"}>{article.title}</Typography>
                      <Typography
                        className="webkitBox"
                        component={"p"}
                        color="text.secondary"
                      >
                        {article.body}
                      </Typography>
                    </CardContent>
                    <div className="text-end me-5">
                      {article.tagList.map((tag) => (
                        <Button
                          className="btn rounded-pill ms-2"
                          sx={{
                            color: theme.palette.mainColor.text,
                            backgroundColor: theme.palette.mainColor.background,
                          }}
                          key={tag}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </Link>
                  <IconButton
                    aria-label="add to favorites"
                    sx={{ position: "absolute", top: "10px", right: "10px" }}
                    onClick = {props.conditionPage ? article.favorited ? ()=>unFavoritArticle(article.slug) : ()=>clickHandelerFav(article.slug)  : clickHandeler}
                  >
                    <span style={{ fontSize: "16px" }}>{article.favoritesCount}</span>
                    <FavoriteIcon sx={{color: article.favorited ? 'green' : ''}} />
                  </IconButton>
                </Card>
              ))
            ) : (
              <p style={{ color: theme.palette.mainColor.text }}>
                No articles are here... yet.
              </p>
            ) 
          }
          </> 
           :

          <>{articleMapping}</> 
          
        )
      ) : props.apppear ? (
        <>{filterTags}</>
      ) : (

        <>{articleMapping}</>
      )}
    </>
  );
}
