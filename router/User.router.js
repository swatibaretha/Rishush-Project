import express from "express";
import {body} from "express-validator";
import {SignUp,SignIn,Profile,DeleteProfile,updateUser} from "../controller/User.controller.js";

const router=express.Router();
router.post("/signUp",SignUp);
router.post("/signIn",SignIn);
router.get("/profile",Profile);
router.delete("/deleteUser",DeleteProfile);
router.put("/updateUser",updateUser);
export default router;