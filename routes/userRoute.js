import express from 'express';
const userRouter = express.Router();
import {loginUser, registerUser, userHome, registerUserGet, loginUserGet, logoutUser} from "../controllers/userController.js";
import { userAuth } from '../middleware/userAuth.js';

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/' ,userAuth ,userHome)
userRouter.get('/register', registerUserGet);
userRouter.get('/login', loginUserGet);
userRouter.get('/logout/:id', logoutUser);


export default userRouter;