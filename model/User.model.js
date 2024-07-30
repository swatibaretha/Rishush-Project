import express from "express";
import mongoose, { Types } from "mongoose";

const mongo=new mongoose.Schema({
    name:{
        type: String,
       
    },
    email:{
        type:String,
       
    },
    password:{
        type:String,
       
    }
})

const User=mongoose.model('user',mongo);
export default User;