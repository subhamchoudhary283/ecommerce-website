import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// placing order using COD method
const placeOrder =async(req,res)=>{
    try {
        const {userId, items, amount, address}= req.body;
        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder= new orderModel(orderData);
        await newOrder.save();
        
        //cleared the cart data
        await userModel.findByIdAndUpdate(userId,{cartData:{}});
        res.json({success:true,message:"Order placed successfully"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in placing order"});
    }
}

// placing order using Stripe method
const placeOrderStripe =async(req,res)=>{

}

// placing order using Razorpay method
const placeOrderRazorpay =async(req,res)=>{

}

//all orders data for admin pannel
const allOrders= async(req,res)=>{
    try {
        const orders=await orderModel.find({});
        res.json({success:true,message:"All orders fetched successfully",orders:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in fetching all orders"});
    }
}
//all orders data for frontend pannel
const userOrders= async(req,res)=>{
    try {
        const {userId}=req.body;
        const orders=await orderModel.find({userId});
        res.json({success:true,message:"User orders fetched successfully",orders:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in fetching user orders"});
    }
}
//update orders status from admin pannel
const updateStatus= async(req,res)=>{
    try {
        const {orderId, status}= req.body;
        await orderModel.findByIdAndUpdate(orderId,{status});
        res.json({success:true,message:"Order status updated successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in updating order status"});
    }
}

export {placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus};