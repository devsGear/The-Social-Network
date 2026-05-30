import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import upload from "../middlewares/multer.js";
import { fetchAllPosts, fetchFollowingPosts, createPost, getUserPosts, uploadProfilePicture, likePost, addComment, likeComment, deleteComment } from '../controllers/post.controllers.js';

const postRouter = express.Router();

postRouter.get('/all', fetchAllPosts);
postRouter.get('/following', isAuth, fetchFollowingPosts);
postRouter.get('/user', isAuth, getUserPosts);
postRouter.post('/create', isAuth, createPost);
postRouter.post("/upload-post-img", upload.single("image"), uploadProfilePicture);
postRouter.post('/like/:postId', isAuth, likePost);
postRouter.post('/comment/:postId', isAuth, addComment);
postRouter.post('/like-comment/:postId/:commentId', isAuth, likeComment);
postRouter.delete('/comment/:postId/:commentId', isAuth, deleteComment);

export default postRouter;
