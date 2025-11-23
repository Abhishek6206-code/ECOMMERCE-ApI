import express from "express";
import { addToCart, getUserCart, removeProduct, clearCart, decreaseQty } from "../Controllers/cart.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addToCart);
router.get("/my", isAuthenticated, getUserCart);
router.delete("/remove/:productId", isAuthenticated, removeProduct);
router.delete("/clear", isAuthenticated, clearCart);
router.patch("/decrease/:productId", isAuthenticated, decreaseQty);

export default router;
