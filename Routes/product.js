import express from "express";
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getProductsByCategory, getFeaturedProducts } from "../Controllers/product.js";
import { isAuthenticated, isAdmin } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, isAdmin, addProduct);
router.get("/all", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);
router.put("/:id", isAuthenticated, isAdmin, updateProduct);
router.delete("/:id", isAuthenticated, isAdmin, deleteProduct);

export default router;
