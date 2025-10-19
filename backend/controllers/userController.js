// here we add the logic to allow user to create an account and login on the website

import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for users login
const loginUser = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user =await userModel.findOne({ email});

        if (!user) {
            return res.json({success: false, message: "User doesn't exist"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({success: true, message: "Login successful", token});
        }
        else{
            res.json({success: false, message: "Invalid password"});
        }

    } catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
     
}

//Route for user register
const registerUser = async(req,res)=>{
    try{
        const {name, email, password} = req.body;
        // checking user already exists or not
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success: false, message: "User already exists"});
        }
         // validating email and strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Invalid email"});
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password"});
        }

        // hashing user password- creating a encrypted password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating user (FIXED LINE)
        const newUser = new userModel({name, email, password: hashedPassword});
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({success: true, message: "User registered successfully",token});
        

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});

    }

}

// Route for admin login
const adminLogin = async(req,res)=>{
    try{
        const {email, password} = req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);

            res.json({success:true,token});
        }
        else{
              res.json({success: false, message: "Invalid admin credentials"});
        }

    } catch(error){
        console.log(error);
        res.json({success: false, message: "error comming"});
    }
    
}

export { loginUser, registerUser, adminLogin };