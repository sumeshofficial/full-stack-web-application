import express from "express";
import expressLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";
import path from "path";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import connectDB from "./config/db.js";
import { userSessionStore, adminSessionStore } from "./session/store.js";
import dotenv from "dotenv";
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
  "/admin",
  session({
    name: "admin.sid",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: adminSessionStore,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
  adminRouter
);
app.use(
  "/",
  session({
    name: "user.sid",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: userSessionStore,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  }),
  userRouter
);

app.use((req, res) => res.render("user/404"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
