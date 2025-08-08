import dotenv from "dotenv";
import { usersModel } from "../models/userModel.js";
dotenv.config();

export const loginAdmin = async (req, res) => {
  try {
    if (req.session.admin) {
      res.redirect("/admin/dashboard");
    }else {
      res.render('admin/login', {message: ""});
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      req.session.admin = "admin";

      res.redirect("/admin/dashboard");
    } else {
      res.render("admin/login", {
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/login", { message: error.message });
  }
};

export const adminDashboard = async (req, res) => {
  try {
    if (req.session.admin) {
      res.render("admin/dashboard");
    } else {
      res.redirect("/admin");
    }
  } catch (error) {
    console.log(error);
    res.render("admin/dashboard", { message: error.message });
  }
};
