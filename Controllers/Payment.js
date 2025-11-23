// import { Payment } from "../Models/Payment.js";
// import Razorpay from "razorpay";


// var instance = new Razorpay({
//     key_id: 'rzp_test_RBXDUeZ174B3Ap',
//     key_secret: '5uBc8LaFypQEivbZOeKvXMi1',
// });

// export const checkout = async (req, res) => {
//     const { amount, cartItems, userShipping, userId } = req.body;
//     var options = {
//         amount: amount * 100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//         currency: "INR",
//         receipt: `receipt_${Date.now}`
//     };
//     const order = await instance.orders.create(options);

//     res.json({
//         orderId: order.id,
//         amount: amount,
//         cartItems, userShipping, userId,
//         payStatus: "created"
//     })
// }

// export const verify = async (req, res) => {
//     const {orderId, paymentId, signature, amount, orderItems, userId, userShipping} = req.body;
//     let orderConfirm=await Payment.create({
//         orderId,paymentId, signature, amount, orderItems, userId, userShipping,
//         payStatus: "paid"
//     })
//     res.json({message:"payment successful",success:true,orderConfirm})
// }

// export const userOrders=async(req,res)=>{
//     let orders=await Payment.find({userId:req.user._id}).sort({orderDate:-1});
//     res.json(orders);
// }