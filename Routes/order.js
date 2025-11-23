import express from "express";
import { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../Controllers/order.js";
import { isAuthenticated, isAdmin } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, placeOrder);
router.get("/my", isAuthenticated, getUserOrders);
router.get("/all", isAuthenticated, isAdmin, getAllOrders);
router.patch("/:id/status", isAuthenticated, isAdmin, updateOrderStatus);

export default router;