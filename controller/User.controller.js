import express from "express";
import User from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


export const SignUp = async (req, res, next) => {
    const { name, password ,email} = req.body;
    console.log(req.body);
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ msg: "User already exists" });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, password: hashpassword,email });
        await newUser.save();
        return res.status(200).json({ msg: "Successfully signed up", user: newUser });
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Server error" ,err});
    }
};


export const SignIn = async (req, res, next) => {
    const { name, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ name });
        console.log(user);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid user' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign(
                { id: user._id, },
                "your-secret-key",
                { expiresIn: '1h' } 
            );
            return res.status(200).json({ msg: 'Successfully signed in', token });
        }
        return res.status(400).json({ msg: 'Invalid credentials' });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Server error' });
    }
};


export const Profile=async (req,res,next)=>{
    const id=req.body.id;
    console.log(id);
    try{
    const user=await User.findById(id);
    console.log(user);
    if(!user){
       return res.status(400).json({msg:"user not found"});
    }
   return res.status(200).json(user);
}catch(err){
    return res.status(400).json({msg:"server error"});
}
}
export const DeleteProfile=async (req,res,next)=>{
    const id=req.body.id;
    try{
        const user= await User.findById(id);
        console.log(user);
        if(!user){
            return res.status(400).json({msg:"user not found"});
        }
       await user.removeOne();
        return res.status(200).json({msg:"user deleted"})
    }catch(err){
        return res.status(400).json({msg:"server error"});
    }
}
export const updateUser=async (req ,res,next)=>{
    const {email,name,id,password}=req.body;
    try{
        const user= await User.findById(id);
        if(!user){
            res.status(400).json({msg:"invalide user"});
        }
        user.name=name||user.name;
        user.email=email||user.email;
        if(password){
            user.password=password;
        }
        await user.save();
        res.status(200).json({msg:"success filly",user});
    }catch(err){
        console.log(err);
        res.status(400).json({msg:"server error"});
    }
}