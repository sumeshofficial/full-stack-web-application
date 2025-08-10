import express from "express";
import expressLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";
import path from "path";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import nocache from "nocache";
import session from "express-session";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

//middlewares
app.use(nocache());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", "views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout/index");
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 60 * 60 * 1000} // 1 day
  })
);

app.use(cookieParser());

app.use("/", userRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
