import { configureStore } from '@reduxjs/toolkit'
import signupSlice from './ReduxSlices/signup-slice'
import loginSlice from './ReduxSlices/login-slice'
import conditionSlice from './ReduxSlices/condition-slice'
import postArticleSlice from './ReduxSlices/postArticle-slice'
import updateUserSlice from './ReduxSlices/updateUser-slice'
import profileSlice from './ReduxSlices/profile-slice'
import followUserSlice from './ReduxSlices/followUser-slice'
import unfollowSlice from './ReduxSlices/unfollow-slice'
import tagsSlice from './ReduxSlices/tags-slice'
import getArticlesSlice from './ReduxSlices/getArticles-slice'
import profilerSlice from './ReduxSlices/profiler-slice'
import slugSlice from './ReduxSlices/slug-slice'
import getArticlesByTagSlice from './ReduxSlices/getArticlesByTag-slice'
import getArticlesByPageSlice from './ReduxSlices/getArticlesByPage-slice'
import getFeedArticlesSlice from './ReduxSlices/getFeedArticles-slice'
import getArticlesByUserName from './ReduxSlices/getArticlesByUserName'
import getArticlesByFavorit from './ReduxSlices/getArticlesByFavorit'
import favoritArticleSlice from './ReduxSlices/favoritArticle-slice'
import updateArticleSlice from './ReduxSlices/updateArticle-slice'
import deleteArticleSlice from './ReduxSlices/deleteArticle-slice'
import getCommentsSlice from './ReduxSlices/getComments-slice'
import postCommentSlice from './ReduxSlices/postComment-slice'
import deleteCommentSlice from './ReduxSlices/deleteComment-slice'
import unfavoritArticleSlice from './ReduxSlices/unfavoritArticle-slice'

export const store = configureStore({
  reducer: {
    signup: signupSlice, 
    login:loginSlice, 
    condition: conditionSlice,
    post:postArticleSlice, 
    update: updateUserSlice,
    profile:profileSlice,
    follow:followUserSlice,
    unfollow:unfollowSlice, 
    tags: tagsSlice, 
    article:getArticlesSlice,
    profiler:profilerSlice,
    slug: slugSlice,
    getArticleByTag: getArticlesByTagSlice, 
    getArticlesByPage:getArticlesByPageSlice,
    feedArticle:getFeedArticlesSlice,
    getArticlesByUserName:getArticlesByUserName,
    getArticlesByFavorit: getArticlesByFavorit,
    favorit:favoritArticleSlice,
    updateArticle: updateArticleSlice,
    deleteArticle: deleteArticleSlice,
    getComments: getCommentsSlice,
    postComment: postCommentSlice,
    deleteComment: deleteCommentSlice,
    unfavorit:unfavoritArticleSlice,  
  },
})
