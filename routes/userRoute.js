import express from 'express';
const userRouter = express.Router();
import {loginUser, registerUser, userHome, registerUserGet, loginUserGet} from "../controllers/userController.js";
import { userAuth } from '../middleware/userAuth.js';

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.get('/' ,userAuth ,userHome)
userRouter.get('/register', registerUserGet);
userRouter.get('/login', loginUserGet);


export default userRouter;