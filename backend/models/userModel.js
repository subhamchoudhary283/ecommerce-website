// User mongoose model

import mongoose from "mongoose";

// create the scemea for our product
const userSchema = new mongoose.Schema({
    name: { type: String,required: true },
    email: { type:String, required:true,unique:true },    // email must be unique
    password: { type: String, required: true },
    cartData:{type: Object , default: {}}
},{minimize: false});  // whenever we create the cart data, by default we provide the value as an empty object

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel;