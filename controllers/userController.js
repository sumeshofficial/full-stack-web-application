import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { usersModel } from "../models/userModel.js";

dotenv.config();

// home route

export const userHome = async (req, res) => {
  try {
    res.render("user/home", { user: req.session.user });
  } catch (error) {
    console.log(error);
    res.render("user/home", { message: error.message });
  }
};

export const registerUserGet = async (req, res) => {
  try {

    if (req.session.user) {
      res.redirect("/");
    } else {
      res.render("user/register", { message: "" });
    }
  } catch (error) {
    console.log(error);
    res.render("user/register", { message: error.message });
  }
};

export const loginUserGet = async (req, res) => {
  try {

    if (req.session.user) {
      return res.redirect('/');
    }

    res.render("user/login", { message: "" });

  } catch (error) {
    console.log(error);
    res.render("user/login", { message: error.message });
  }
};

// route for register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking user already exists or not
    const exists = await usersModel.findOne({ email });
    if (exists) {
      return res.render("user/register", { message: "User already exists" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const newUser = new usersModel({
      name,
      email,
      password: hasedPassword,
    });

    const user = await newUser.save();

    res.render("/");
  } catch (error) {
    console.log(error);
    res.render("user/register", { message: error.message });
  }
};

// route for user login
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await usersModel.findOne({ email });

    if (!user) {
      return res.render("user/login", { message: "User doesn't exixts" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {

      req.session.user = user.name;

      res.redirect("/");
    } else {
      res.render("user/login", { message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.render("user/login", { message: error.message });
  }
};

// route for admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {

      res.render("admin/home");
    } else {
      res.render("admin/login", { message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/home", { message: error.message });
  }
};
