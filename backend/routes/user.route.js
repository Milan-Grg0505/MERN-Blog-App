import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.put("/profile/update",isAuthenticated,singleUpload,updateProfile)

export default router;