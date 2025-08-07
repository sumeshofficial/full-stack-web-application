import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import path from 'path';
import userRouter from './routes/userRoute.js';
import connectDB from './config/db.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
connectDB();

app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine",'ejs');
app.use(expressLayouts);

app.set('layout', 'layout/index'); 

app.use("/" ,userRouter);

app.listen(3000);