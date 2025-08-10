import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { usersModel } from "../models/userModel.js";

dotenv.config();

// home route

export const userHome = async (req, res) => {
  try {
    res.render("user/home", { user: req.session.user, pageCss: 'login' });
  } catch (error) {
    console.log(error);
    res.render("user/home", { message: error.message, pageCss: 'login' });
  }
};

export const registerUserGet = async (req, res) => {
  try {

    if (req.session.user) {
      res.redirect("/");
    } else {
      res.render("user/register", { message: "", pageCss: 'login' });
    }
  } catch (error) {
    console.log(error);
    res.render("user/register", { message: error.message, pageCss: 'login' });
  }
};

export const loginUserGet = async (req, res) => {
  try {

    if (req.session.user) {
      return res.redirect('/');
    }

    res.render("user/login", { message: "", pageCss: 'login' });

  } catch (error) {
    console.log(error);
    res.render("user/login", { message: error.message, pageCss: 'login' });
  }
};

// route for register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking user already exists or not
    const exists = await usersModel.findOne({ email });
    if (exists) {
      return res.render("user/register", { message: "User already exists", pageCss: 'login' });
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

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("user/register", { message: error.message, pageCss: 'login' });
  }
};

// route for user login
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await usersModel.findOne({ email });

    if (!user) {
      return res.render("user/login", { message: "User doesn't exixts", pageCss: 'login' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {

      req.session.user = user.name;

      res.redirect("/");
    } else {
      res.render("user/login", { message: "Invalid credentials", pageCss: 'login' });
    }
  } catch (error) {
    console.log(error);
    res.render("user/login", { message: error.message, pageCss: 'login' });
  }
};
