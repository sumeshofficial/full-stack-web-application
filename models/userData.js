import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

export const usersModel = mongoose.model("users", userSchema);