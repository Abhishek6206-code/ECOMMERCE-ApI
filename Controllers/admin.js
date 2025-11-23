import { Order } from "../Models/Order.js";
import { Product } from "../Models/Product.js";
import { User } from "../Models/User.js";

export const getAdminSummary = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name email");

    res.json({
      success: true,
      totalRevenue,
      totalOrders,
      totalProducts,
      totalUsers,
      recentOrders
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
