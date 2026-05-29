import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { addFriend, getFollowing } from '../controllers/utility.controllers.js';

const utilityRouter = express.Router();

utilityRouter.post('/add-friend', isAuth, addFriend);
utilityRouter.get('/following', isAuth, getFollowing);

export default utilityRouter;
