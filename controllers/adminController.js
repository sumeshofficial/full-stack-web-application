import dotenv from "dotenv";
import { usersModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
dotenv.config();

export const loginAdmin = async (req, res) => {
  try {
    if (req.session.admin) {
      res.redirect("/admin/dashboard");
    } else {
      res.render("admin/login", { message: "", pageCss: "login" });
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
        pageCss: "login",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/login", { message: error.message, pageCss: "login" });
  }
};

export const adminDashboard = async (req, res) => {
  try {
    if (!req.session.admin) {
      return res.redirect("/admin");
    }

    let perPage = 5;
    let page = req.query.page || 1;

    const users = await usersModel
      .aggregate([{ $sort: { name: 1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await usersModel.countDocuments({});

    res.render("admin/dashboard", {
      pageCss: "dashboard",
      users,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (req, res) => {
  res.render("admin/users/add", { pageCss: "dashboard", message: "" });
};

export const postUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await usersModel.findOne({ email });
    if (exists) {
      return res.render("admin/users/add", {
        message: "User already exists",
        pageCss: "dashboard",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    const newUser = new usersModel({
      name,
      email,
      password: hasedPassword,
    });
    const user = await newUser.save();
    console.log(user);
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
};

export const viewUser = async (req, res) => {
  try {
    const user = await usersModel.findOne({ _id: req.params.id });

    res.render("admin/users/view", { pageCss: "dashboard", user });
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (req, res) => {
  try {
    const user = await usersModel.findOne({ _id: req.params.id });

    res.render("admin/users/edit", { pageCss: "dashboard", user });
  } catch (error) {
    console.log(error);
  }
};

export const editPostUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await usersModel.updateOne(
      { _id: req.params.id },
      { name: name, email: email }
    );

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await usersModel.deleteOne({ _id: req.params.id });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const users = await usersModel.find({
      name: { $regex: new RegExp(searchNoSecialChar, "i") },
    });

    res.render("admin/search", { pageCss: "dashboard", users });
  } catch (error) {
    console.log(error);
  }
};

export const about = async (req, res) => {
  try {
    res.render("admin/about", { pageCss: "dashboard"});
  } catch (error) {
    console.log(error);
  }
};
