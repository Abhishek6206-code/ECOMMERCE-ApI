import express from "express";
import { addAddress, getAddress } from "../Controllers/address.js";
import { isAuthenticated } from "../Middlewares/Auth.js";
import { deleteAddress } from "../Controllers/address.js";

const router = express.Router();

router.post("/add", isAuthenticated, addAddress);
router.get("/my", isAuthenticated, getAddress);
router.delete("/delete/:id", isAuthenticated, deleteAddress);

export default router;