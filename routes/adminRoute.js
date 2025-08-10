import express from "express";
const adminRouter = express.Router();
import dotenv from 'dotenv'
import { loginAdmin, verifyAdmin, adminDashboard, addUser, postUser, viewUser } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";
import session from "express-session";
import nocache from "nocache";
dotenv.config();

const secret_key = process.env.SESSION_KEY;

adminRouter.use(nocache());

adminRouter.use(
  session({
    secret: secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

adminRouter.get("/", loginAdmin);
adminRouter.post("/", verifyAdmin);
adminRouter.get('/dashboard',adminAuth, adminDashboard);
adminRouter.get('/add',adminAuth, addUser);
adminRouter.post('/add',adminAuth, postUser);
adminRouter.get('/view/:id',adminAuth, viewUser);


adminRouter.use((req, res) => {
  res.status(404).render('admin/404', {pageCss: 'dashboard'})
})

export default adminRouter;
