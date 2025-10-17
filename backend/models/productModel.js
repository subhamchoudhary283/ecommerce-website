// Product mongoose model

import mongoose from "mongoose";

// create the scemea for our product
const productSchema=new mongoose.Schema({
    name:{type:String , required:true },
    description:{type:String , required:true },
    price:{type:Number , required:true },
    image:{type:Array , required:true },
    category:{type:String , required:true },
    subCategory:{type:String , required:true },
    sizes :{type:Array , required:true },
    bestseller:{type:Boolean },
    date:{type:Number , required:true }
})
// create the model
const productModel = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel;