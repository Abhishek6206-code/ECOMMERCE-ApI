import express from "express";
import { getAdminSummary } from "../Controllers/admin.js";
import { isAuthenticated, isAdmin } from "../Middlewares/Auth.js";

const router = express.Router();

router.get("/summary", isAuthenticated, isAdmin, getAdminSummary);

export default router;
