import express from 'express';
const userRouter = express.Router();
import {loginUser, registerUser, loginAdmin, userHome, registerUserGet, loginUserGet} from "../controllers/userController.js";
import { userAuth } from '../middleware/userAuth.js';

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', loginAdmin);

userRouter.get('/' ,userAuth ,userHome)


userRouter.get('/register', registerUserGet);

userRouter.get('/login', loginUserGet);

userRouter.get('/admin', (req, res) => {
    res.render("admin/login", {message: "" });
});

export default userRouter;