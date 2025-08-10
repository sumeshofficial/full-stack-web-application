import express from "express";
const adminRouter = express.Router();
import dotenv from 'dotenv'
import { loginAdmin, verifyAdmin, adminDashboard, addUser, postUser, viewUser, editUser, editPostUser, deleteUser, searchUser, about } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";
import nocache from "nocache";
dotenv.config();
adminRouter.use(nocache());

adminRouter.get("/", loginAdmin);
adminRouter.post("/", verifyAdmin);
adminRouter.get('/dashboard',adminAuth, adminDashboard);
adminRouter.get('/add',adminAuth, addUser);
adminRouter.post('/add',adminAuth, postUser);
adminRouter.get('/view/:id',adminAuth, viewUser);
adminRouter.get('/edit/:id',adminAuth, editUser);
adminRouter.post('/edit/:id',adminAuth, editPostUser);
adminRouter.get('/delete/:id',adminAuth, deleteUser);
adminRouter.post('/search',adminAuth, searchUser);
adminRouter.get('/about',adminAuth, about);


adminRouter.use((req, res) => {
  res.status(404).render('admin/404', {pageCss: 'dashboard'})
})

export default adminRouter;
