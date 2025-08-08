import express from 'express';
const userRouter = express.Router();
import {loginAdmin, verifyAdmin} from "../controllers/adminController.js";
import { userAuth } from '../middleware/userAuth.js';

userRouter.post('/admin', loginAdmin);
userRouter.get('/admin', verifyAdmin);