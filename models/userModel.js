import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  blocked: { type: Boolean, default: false },
});

export const usersModel =
  mongoose.model.user || mongoose.model("user", userSchema);
