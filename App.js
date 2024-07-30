import express from "express";
import mongoose from  "mongoose";
import userRouter from "./router/User.router.js";
import bodyParser from "body-parser";
const app=express();

mongoose.connect("mongodb://localhost:27017/Eleven")
.then(result=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use("/user",userRouter);

    app.listen(3000,()=>{
        console.log("server is created");
    })
}).catch(err=>{
    console.log(err);
});
