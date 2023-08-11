import React, {useState} from "react";
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
  import { Link } from "react-router-dom";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useDispatch } from "react-redux";
  import { favoritFetch } from "../../ReduxPages/ReduxSlices/favoritArticle-slice";
  import { unfavoritFetch } from "../../ReduxPages/ReduxSlices/unfavoritArticle-slice";


export default function FeedArticles(props){
    const theme = useTheme();
    const dispatch = useDispatch(); 
    const user = props.condition ? JSON.parse(localStorage.getItem('user-info')) :''; 
    const token = props.condition ? JSON.parse(localStorage.getItem('jwt')) :'' ;
    const pageNumber =props.pageNumber;
    
    function unFavoritArticle(slug , username){
      if(user.username === props.usernameProfile && props.appearMyArticles){
        dispatch(unfavoritFetch({ slug , token})).then(()=>{
          dispatch(props.feddFetch({pageNumber, token}))
        })
      } else if(props.appearMyArticles) {
        dispatch(unfavoritFetch({ slug , token})).then(()=>{
          dispatch(props.getArticlesByUsernameFetch({pageNumber, username, token}))
        })
      } else  { 
        const username = user.username; 
        dispatch(unfavoritFetch({ slug , token}))
        .then(()=>{
          dispatch(props.getArticlesByFavoritFetch({pageNumber, username, token}))
        }) 
      }
    }

    function clickHandelerFav(slug, username){
      if(user.username === props.usernameProfile && props.appearMyArticles){
        dispatch(favoritFetch({ slug , token})).then(()=>{
          dispatch(props.feddFetch({pageNumber, token}))
        })
      } else if(props.appearMyArticles){
        dispatch(favoritFetch({ slug , token})).then(()=>{
          dispatch(props.getArticlesByUsernameFetch({pageNumber, username, token}))
        }) 
      } else { 
        dispatch(favoritFetch({ slug , token})).then(()=>{
          dispatch(props.getArticlesByFavoritFetch({pageNumber, username, token}))
        }) 
      }
      } 
      
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

    return(
        <>
        {props.condition  ? 
        user.username === props.usernameProfile && props.appearMyArticles ? 
        props.feedARticles.articles?.length > 0 ?  props.feedARticles.articles.map((article) => (
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
              subheader={article.createdAt.slice(0,10)}
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
            onClick = {article.favorited ? ()=>unFavoritArticle(article.slug) : ()=>clickHandelerFav(article.slug) }
            
          >
            <span style={{ fontSize: "16px" }}>{article.favoritesCount}</span>
            <FavoriteIcon sx={{color: article.favorited ? 'green' : ''}} />
          </IconButton>
        </Card>
        )) : <p style={{color:theme.palette.mainColor.text}} >No Artiles Yet</p>

        :
        props.appearMyArticles ? 
        props.getArticlesByUserName.articles?.length > 0 ?  props.getArticlesByUserName.articles.map((article) => (
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
              subheader={article.createdAt.slice(0,10)}
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
            onClick = {article.favorited ? ()=>unFavoritArticle(article.slug , article.author.username) : ()=>clickHandelerFav(article.slug, article.author.username) }
            
          >
            <span style={{ fontSize: "16px" }}>{article.favoritesCount}</span>
            <FavoriteIcon sx={{color: article.favorited ? 'green' : ''}} />
          </IconButton>
        </Card>
          )) : <p style={{color:theme.palette.mainColor.text}} >No Artiles Yet</p>
        
        
        : props.getArticlesByFavorit.articles?.length > 0 ? props.getArticlesByFavorit.articles.map((article) => (
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
              subheader={article.createdAt.slice(0,10)}
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
            onClick = {article.favorited ? ()=>unFavoritArticle(article.slug, article.author.username) : ()=>clickHandelerFav(article.slug, article.author.username) }
            
          >
            <span style={{ fontSize: "16px" }}>{article.favoritesCount}</span>
            <FavoriteIcon sx={{color: article.favorited ? 'green' : ''}} />
          </IconButton>
        </Card>
          )) : <p style={{color:theme.palette.mainColor.text}} > No favorit Articles yet </p>  
        
        // without sign in 
        :
        props.appearMyArticles ? 
        props.getArticlesByUserName.articles?.length > 0 ?  props.getArticlesByUserName.articles.map((article) => (
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
                  subheader={article.createdAt.slice(0,10)}
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
                onClick={clickHandeler}
              >
                <span style={{ fontSize: "16px" }}>{article.favoritesCount}</span>
                <FavoriteIcon />
              </IconButton>
            </Card>
          )) : <p style={{color:theme.palette.mainColor.text}} >No Artiles Yet</p>
        
        
        : props.getArticlesByFavorit.articles?.length > 0 ? props.getArticlesByFavorit.articles.map((article) => (
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
                  subheader={article.createdAt.slice(0,10)}
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
                onClick={clickHandeler}
              >
                <span style={{ fontSize: "16px" }}>{article.favoritesCount}</span>
                <FavoriteIcon />
              </IconButton>
            </Card>
          )) : <p style={{color:theme.palette.mainColor.text}} > No favorit Articles yet </p>  
        }
        
        </>
    )
}