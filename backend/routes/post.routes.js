import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { fetchAllPosts, fetchFollowingPosts, createPost, getUserPosts } from '../controllers/post.controllers.js';

const postRouter = express.Router();

postRouter.get('/all', fetchAllPosts);
postRouter.get('/following', isAuth, fetchFollowingPosts);
postRouter.get('/user', isAuth, getUserPosts);
postRouter.post('/create', isAuth, createPost);

export default postRouter;
