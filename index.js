import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./connection.js";
import router from "./routes/user.js";


const app=express();

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use('/backend',router)



export default app;


