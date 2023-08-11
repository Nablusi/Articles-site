import { Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tags from "../components/tags/Tags";
import Articles from "../components/articles/Articles";
import { getTagFetch } from "../ReduxPages/ReduxSlices/getArticlesByTag-slice";
import { articleFetch } from "../ReduxPages/ReduxSlices/getArticles-slice";
import PaginationComponent from "../components/pagination/PaginationReact";
import { getArticlesByPageFetch } from "../ReduxPages/ReduxSlices/getArticlesByPage-slice";
import { feddFetch } from "../ReduxPages/ReduxSlices/getFeedArticles-slice";

export default function Home() {
  const theme = useTheme();
  const [tag, setTags] = useState("");
  const conditionPage = useSelector((state) => state.condition);
  const getArticleByTag = useSelector((state) => state.getArticleByTag);
  const dispatch = useDispatch();
  const [apppear, setAppear] = useState(false);
  const [feedAppear, setFeedAppear] = useState(true);
  const [globalAppear, setGlobalAppear] = useState(false);
  const articles = useSelector((state) => state.article);
  const articlesPerPage = 10;
  const [pageNumber, setPageNumber] = useState(0);
  const articlesPerPageRedux = useSelector((state) => state.getArticlesByPage);
  let getArticlesForCard = articlesPerPageRedux.articles;
  const token = conditionPage ? JSON.parse(localStorage.getItem("jwt")) : "";
  const feed = useSelector((state) => state.feedArticle);
  const [greenHeart, setGreenHeart] = useState(false);

  let numberOfArticles = conditionPage
    ? feedAppear
      ? feed.articlesCount
      : apppear
      ? getArticleByTag.articlesCount
      : articles.articlesCount
    : apppear
    ? getArticleByTag.articlesCount
    : articles.articlesCount;

  useEffect(() => {
    if (conditionPage) {
      dispatch(feddFetch({ token, pageNumber }));
      if (!apppear) {
        dispatch(getArticlesByPageFetch({ pageNumber, token }));
        dispatch(articleFetch());
      } else {
        dispatch(getTagFetch({ tag, pageNumber, token }));
      }
    } else {
      if (!apppear) {
        dispatch(getArticlesByPageFetch({ pageNumber, token }));
        dispatch(articleFetch());
      } else {
        dispatch(getTagFetch({ tag, pageNumber, token }));
      }
    }
  }, [pageNumber, apppear, dispatch, greenHeart, feedAppear, globalAppear]);

  useEffect(() => {
    const token =  JSON.parse(localStorage.getItem("jwt"))
    dispatch(feddFetch({ token, pageNumber }));
  }, []);

  function tagsFilter(tag, pageNumber) {
    dispatch(getTagFetch({ tag, pageNumber, token }));
    setAppear(true);
    setFeedAppear(false);
    setTags(tag);
    setPageNumber(0);
  }

  function clickHandeler() {
    setAppear(false);
    setFeedAppear(false);
    setGlobalAppear(true);
    setPageNumber(0);
  }
  function clickHandelerFeed() {
    setAppear(false);
    setFeedAppear(true);
    setGlobalAppear(false);
    setPageNumber(0);
  }

  return (
    <>
      {conditionPage ? (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8">
              <button
                className="btn rounded-0"
                style={{
                  color: theme.palette.mainColor.main,
                  position: "relative",
                  width: "180px",
                  borderBottom: feedAppear ? "1px solid green" : "",
                }}
                onClick={clickHandelerFeed}
              >
                Your Feed
              </button>
              <button
                className="btn rounded-0"
                style={{
                  color: theme.palette.mainColor.main,
                  position: "relative",
                  width: "180px",
                  borderBottom: globalAppear ? "1px solid green" : "",
                }}
                onClick={clickHandeler}
              >
                Global Article
              </button>
              {apppear ? (
                <span style={{ color: theme.palette.mainColor.main }}>
                  {`#${tag}`}
                </span>
              ) : (
                ""
              )}
              <div className="border-bottom mb-3"></div>
              <Articles
                apppear={apppear}
                getArticleByTag={getArticleByTag}
                articleFetch={articleFetch}
                articles={articles}
                numberOfArticles={numberOfArticles}
                articlesPerPage={articlesPerPage}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                getArticlesForCard={getArticlesForCard}
                feed={feed}
                conditionPage={conditionPage}
                feedAppear={feedAppear}
                feddFetch={feddFetch}
                token={token}
                setGreenHeart={setGreenHeart}
                greenHeart={greenHeart}
                globalAppear={globalAppear}
                getArticlesByPageFetch={getArticlesByPageFetch}
                getTagFetch={getTagFetch}
                tag={tag}
              />
              <div>
                <PaginationComponent
                  numberOfArticles={numberOfArticles}
                  articlesPerPage={articlesPerPage}
                  setPageNumber={setPageNumber}
                  pageNumber={pageNumber}
                />
              </div>
            </div>
            <div className="col-md-4">
              <Tags tagsFilter={tagsFilter} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Typography
            component={"div"}
            sx={{
              width: "100%",
              height: "170px",
              backgroundColor: theme.palette.mainColor.main,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="background"
          >
            <h2
              className="text-center"
              style={{ color: "#ffffff", fontSize: "30px", fontWeight: "bold" }}
            >
              conduit
            </h2>
            <p
              className="text-center"
              style={{ color: "#ffffff", fontSize: "20px" }}
            >
              {" "}
              A place to share Knowledge{" "}
            </p>
          </Typography>

          <div className="container mt-5">
            <div className="row">
              <div className="col-md-8">
                <button
                  className="border-bottom parabottom btn rounded-0"
                  style={{
                    color: theme.palette.mainColor.main,
                    position: "relative",
                    width: "180px",
                  }}
                  onClick={clickHandeler}
                >
                  Global Article
                </button>
                {apppear ? (
                  <span style={{ color: theme.palette.mainColor.main }}>
                    {`#${tag}`}
                  </span>
                ) : (
                  ""
                )}
                <div className="border-bottom mb-3"></div>
                <Articles
                  apppear={apppear}
                  getArticleByTag={getArticleByTag}
                  articleFetch={articleFetch}
                  articles={articles}
                  numberOfArticles={numberOfArticles}
                  articlesPerPage={articlesPerPage}
                  setPageNumber={setPageNumber}
                  pageNumber={pageNumber}
                  getArticlesForCard={getArticlesForCard}
                />
                <div>
                  <PaginationComponent
                    numberOfArticles={numberOfArticles}
                    articlesPerPage={articlesPerPage}
                    setPageNumber={setPageNumber}
                    pageNumber={pageNumber}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <Tags tagsFilter={tagsFilter} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
