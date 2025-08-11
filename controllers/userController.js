import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { usersModel } from "../models/userModel.js";
import { name } from "ejs";

dotenv.config();

/**
 * GET /
 * userHome
 */

export const userHome = async (req, res) => {
  try {
    const user = await usersModel.findOne({ name: req.session.user });
    res.render("user/home", { user: req.session.user, pageCss: "", user });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * registerUser
 */
export const registerUserGet = async (req, res) => {
  try {
    if (req.session.userId) {
      res.redirect("/");
    } else {
      res.render("user/register", { message: "", pageCss: "login" });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * loginUser
 */
export const loginUserGet = async (req, res) => {
  try {
    if (req.session.userId) {
      return res.redirect("/");
    }

    res.render("user/login", { message: "", pageCss: "login" });
  } catch (error) {
    console.log(error);
  }
};

/**
 * POST /
 * registerUser
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking user already exists or not
    const exists = await usersModel.findOne({ email });
    if (exists) {
      return res.render("user/register", {
        message: "User already exists",
        pageCss: "login",
      });
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
  }
};

/**
 * POST /
 * loginUser
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findOne({ email });

    if (!user) {
      return res.render("user/login", {
        message: "User doesn't exixts",
        pageCss: "login",
      });
    }

    if (user.blocked === true) {
      return res.render("user/login", {
        message: "You are blocked by admin",
        pageCss: "login",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.user = user.name;
      req.session.userId = user._id.toString();

      res.redirect("/");
    } else {
      res.render("user/login", {
        message: "Invalid credentials",
        pageCss: "login",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * logoutUser
 */
export const logoutUser = async (req, res) => {
  try {
    const client = mongoose.connection.getClient();
    const sessionCollection = client.db().collection("userSessions");
    await sessionCollection.deleteMany({ "session.userId": req.params.id });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};
