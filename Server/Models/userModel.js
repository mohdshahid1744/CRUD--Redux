const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true
},

  email:
   { 
    type: String, 
    unique: true, 
    required: true 
},
phone:{
    type:Number,
},

  password: {
     type: String,
      required: true },
  img: { 
    type: String 
},
  isAdmin: { 
    type: Boolean, 
    default: false 
}, 
},{timestamps:true});



const userModel = mongoose.model("User", userSchema);

module.exports = userModel;