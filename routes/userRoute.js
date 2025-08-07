import express from 'express';
const userRouter = express.Router();
import {loginUser, registerUser, loginAdmin} from "../controllers/userController.js";

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', loginAdmin);

userRouter.get('/register', (req, res) => {
    res.render("user/register", {message: ""});
});

userRouter.get('/login', (req, res) => {
    res.render("user/login", {message: "" });
});

export default userRouter;