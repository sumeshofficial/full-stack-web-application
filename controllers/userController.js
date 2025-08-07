import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { usersModel } from "../models/userModel.js";

dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
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

    const token = createToken(user._id);

    res.render("user/home",{user:user.name});
  } catch (error) {
    console.log(error);
    res.render("user/register", { message: error });
  }
};

// route for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await usersModel.findOne({ email });

    if (!user) {
      return res.render("user/login", { message: "User doesn't exixts" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.render("user/home",{user:user.name});
    } else {
      res.render("user/login", { message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.render("user/login", { message: error });
  }
};

// route for admin login
export const loginAdmin = async (req, res) => { };
