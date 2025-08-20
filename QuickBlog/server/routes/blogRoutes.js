import express from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/BlogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post("/add",upload.single("image"),addBlog);
blogRouter.get("/all",getAllBlogs);
blogRouter.get("/:blogId",getBlogById);
blogRouter.post("/delete",deleteBlogById);
blogRouter.post("/toggle-publish",togglePublish);
blogRouter.post("/add-comment",addComment);
blogRouter.post("/comments",getBlogComments);
blogRouter.post("/generate",generateContent);

export default blogRouter;