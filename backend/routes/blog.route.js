import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import { createBlog, updateBlog } from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/",isAuthenticated,createBlog);
router.put("/:blogId",isAuthenticated,singleUpload,updateBlog);


export default router;