import { usersModel } from "../models/userData.js";

export const registerUser = async (req, res) => {
  try {
    const users = await usersModel.create(req.body);
    console.log(users);
    res.json(users);
  } catch (error) {
    res.json(error)
  }
};

export const loginUser = async () => {};
