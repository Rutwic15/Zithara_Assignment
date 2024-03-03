import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json({limit:"16kb"}));
// app.use(express.urlencoded({extended: true, limit:"16kb"}));
app.use(express.static("public"));

app.use("/api/v1/users",userRouter)
app.use("/api/v1/data",userRouter)


export {app};