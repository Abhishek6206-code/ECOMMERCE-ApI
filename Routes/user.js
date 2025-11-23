import express from 'express'
import { signup,login,getAllUsers,createAdmin } from '../Controllers/user.js';
import { isAuthenticated, isAdmin } from '../Middlewares/Auth.js';
import { deleteUser } from '../Controllers/user.js';
const router=express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/createAdmin",createAdmin)


router.get("/all", isAuthenticated, isAdmin, getAllUsers);
router.delete("/:id", isAuthenticated, isAdmin, deleteUser);


export default router;