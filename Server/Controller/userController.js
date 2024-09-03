
const userModel=require('../Models/userModel');
const bcrypt=require('bcrypt')
const {generateToke}= require('../utils/generateToken')
const mongoose = require("mongoose");



const signup=async(req,res)=>{
    try {
        console.log("keri");
        let { name, email,phone, password,img } = req.body;
        console.log("req.body",req.body);
        const existUser= await userModel.findOne({email:email})
        console.log("exist",existUser);
        if(existUser){
            res.status(400).json({message:"User already exist"})
        }
        const hashedPassword=await bcrypt.hash(password,6)
        const userData= await userModel.create({
            name,
            email,
            phone,
            password:hashedPassword,
        })
        console.log("kitty");
        if(userData){
            
            res.status(200).json({
                _id:userData._id,
                name:userData.name,
                email:userData.email,
                phone:userData.phone,
                password: userData.password,
                token:generateToke(res,userData._id),
            })
            console.log("ASD",userData)
        }else{
            res.status(400);
            throw new Error('Invalid user data')
        }
    } catch (error) {
        console.error(error);
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user= await userModel.findOne({email})
        
    
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        res.status(200).json({
            
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            token:generateToke(res,user._id),
      });
      console.log("token:::",user.token);
    } else {
      res.status(401).json({ message: 'Invalid email or password ' });
    }
  } else {
    res.status(401).json({ message: 'Invalid ' });
  }
    } catch (error) {
        console.error(error);
    }
}




const updatePicture = async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
  
      const user = await userModel.findById(id);
      
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      user.img = req.file.filename;
  
      await user.save();
  console.log("SDF",user);
      res.status(201).json({
        success: true,
        message: "Profile picture updated successfully",
        img: user.img
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
module.exports={
    signup,
    login,
    updatePicture
}