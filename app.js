import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoute from "./Routes/AuthRoute.js";
import ProductRoute from "./Routes/ProductRoute.js";

const app = express();
const port = process.env.PORT || 1000;

dotenv.config();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

app.use("/auth",AuthRoute);
app.use("/product",ProductRoute);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
  