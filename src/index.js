import express from "express";
import morgan from "morgan";
import cors from "cors"
import connect from "./config/db.js";
import route from './routes/index.js'
import { errorHandler } from "./middleware/errorHandle.js";
import dotenv from 'dotenv';
import deleteLog from "./config/deleteLog.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

connect();
route(app);
app.use(errorHandler);
deleteLog();

app.listen(process.env.PORT, () => {
  console.log(`Listening`);
});
