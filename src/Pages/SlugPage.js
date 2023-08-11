import {
  Avatar,
  CardHeader,
  Divider,
  useTheme,
  Button,
  IconButton,
  TextField,
  Card,
  CardActions,
  Typography,
  CardContent,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { slugFetch } from "../ReduxPages/ReduxSlices/slug-slice";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteArticleFetch } from "../ReduxPages/ReduxSlices/deleteArticle-slice";
import { getCommentsFetch } from "../ReduxPages/ReduxSlices/getComments-slice";
import { postCommentFetch } from "../ReduxPages/ReduxSlices/postComment-slice";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteCommentFetch } from "../ReduxPages/ReduxSlices/deleteComment-slice";

export default function SlugPage() {
  const theme = useTheme();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigete = useNavigate();
  const slugRedux = useSelector((state) => state.slug);
  const conditions = useSelector((state) => state.condition);
  const user =  conditions ?  JSON.parse(localStorage.getItem("user-info")) :''; 
  const token = conditions ?  JSON.parse(localStorage.getItem("jwt")) :''; 
  const comments = useSelector((state) => state.getComments);
  const [body, setBody] = useState();

  useEffect(() => {
    dispatch(slugFetch(slug));
  }, [slugRedux.title, slugRedux.description, slugRedux.body]);

  useEffect(() => {
    dispatch(getCommentsFetch({ slug, token }));
  }, [slug]);

  if (!slugRedux || !slugRedux.description) {
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

  function deleteBtn() {
    dispatch(deleteArticleFetch({ slug, token }));
    navigete(`/profile/${user.username}`);
  }

  function deleteCommentButton(id) {
    dispatch(deleteCommentFetch({ slug, id, token })).then(()=>{
      dispatch(getCommentsFetch({ slug, token }));
    })
  }

  function postComment() {
    if (conditions) {
      dispatch(postCommentFetch({ body, slug, token })).then(() => {
      dispatch(getCommentsFetch({ slug, token }));
      });
    } else {
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
  }

  return (
    <>
      <div
        className="background d-flex flex-column justify-content-center"
        style={{
          backgroundColor: theme.palette.mainColor.main,
          width: "100%",
          height: "270px",
        }}
      >
        <div className="container">
          <h2> {slugRedux.description} </h2>
          <Link to={`/profile/${slugRedux.author.username}`} style={{color:theme.palette.mainColor.text, textDecoration:"none"}}>
          <CardHeader
            avatar={<Avatar src={slugRedux.author.image} alt="m" />}
            title={slugRedux.author.username}
            subheader={slugRedux.createdAt.slice(0, 10)}
          />
          </Link>


        </div>
        {user.username === slugRedux.author.username ? (
          <div className="d-flex flex-row position-relative container">
            <Link to={`/updatepage/${slugRedux.slug}`}>
              <IconButton
                sx={{ position: "absolute", top: "-150px", right: "10px" }}
              >
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              sx={{ position: "absolute", top: "-150px", right: "60px" }}
              onClick={deleteBtn}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="container mt-4">
        <p style={{ color: theme.palette.mainColor.text }}>{slugRedux.body}</p>
        <p>
          {slugRedux.tagList.map((tag) => (
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
        </p>
        <div className="border-bottom mb-2"></div>
        {conditions ? (
          ""
        ) : (
          <p
            className="text-center mt-3"
            style={{ color: theme.palette.mainColor.text }}
          >
            <Link
              to="/signin"
              style={{
                color: theme.palette.mainColor.main,
                textDecoration: "none",
              }}
            >
              <span>Sign In</span>
            </Link>
            <span className="ps-2 pe-2">or</span>
            <Link
              to="/signup"
              style={{
                color: theme.palette.mainColor.main,
                textDecoration: "none",
              }}
            >
              <span className="pe-2">Sign Up</span>
            </Link>
            to add comments on this article
          </p>
        )}
      </div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <card
              style={{ width: "100%", color: theme.palette.mainColor.main }}
            >
              <TextField
                multiline
                rows={5}
                sx={{ width: "100%" }}
                placeholder="Write a comment..."
                onChange={(e) => setBody(e.target.value)}
              />
              <div
                className="d-flex flex-row justify-content-between align-items-center"
                style={{ backgroundColor: theme.palette.mainColor.background }}
              >
                <Link to={`/profile/${user.username}`} style={{color:theme.palette.mainColor.main, textDecoration:"none"}}>
                <CardHeader
                  avatar={<Avatar src={user.image} alt="avatar" />}
                  title={user.username}
                  //  subheader={formattedDate}
                />
                </Link>

                <Button
                  sx={{
                    color: theme.palette.mainColor.text,
                    backgroundColor: theme.palette.mainColor.main,
                    height: "50px",
                    mr: "15px",
                  }}
                  onClick={postComment}
                >
                  Post
                </Button>
              </div>
            </card>

            {comments.comments?.length > 0
              ? comments.comments.map((comment) => (
                  <div
                    key={comment.id}
                    style={{
                      width: "100%",
                      color: theme.palette.mainColor.main,
                      marginBottom: "20px",
                      marginTop: "10px",
                    }}
                  >
                    <Card>
                      <Link to={`/profile/${comment.author.username}`} style={{color:theme.palette.mainColor.main, textDecoration:"none"}}>
                      <CardHeader
                        avatar={
                          <Avatar src={comment.author.image} alt="avatar" />
                        }
                        title={comment.author.username}
                        subheader={comment.createdAt.slice(0, 10)}
                      />
                      </Link>

                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body1" color="textPrimary">
                          {comment.body}
                        </Typography>
                        {user.username === comment.author.username ? (
                          <IconButton
                            onClick={() => deleteCommentButton(comment.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        ) : (
                          ""
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
