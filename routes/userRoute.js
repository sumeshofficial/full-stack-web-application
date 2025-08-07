import express from 'express';
const router = express.Router();
import {loginUser, registerUser} from "../controllers/userController.js";

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/register', (req, res) => {
    res.render("user/register");
});

router.get('/login', (req, res) => {
    res.render("user/login");
});

export default router;