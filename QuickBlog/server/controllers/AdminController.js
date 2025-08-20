import jwt from 'jsonwebtoken';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';

export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Check credentials from environment variables
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token (with expiry for security)
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET// token expires in 1 hour
    );

    return res.json({ success: true, token});
    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllBlogsAdmin = async(req,res)=>{
  try {
    const blogs = await Blog.find({}).sort({createdAt:-1});
    res.json({success:true,blogs});
    
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

export const getAllComments = async (req,res)=>{
  try {
    const comments = await Comment.find({}).populate("blog").sort({createdAt:-1});
    res.json({success:true,comments})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

export const getDashboard = async (req , res)=>{
  try {
       const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5);
       const blogs = await Blog.countDocuments();
       const comments = await Comment.countDocuments();
       const drafts = await Blog.countDocuments({isPublished:false});
       const dashboardData ={
        blogs,comments,drafts,recentBlogs
       }
       res.json({success:true,dashboardData})
  } catch (error) {
      res.json({success:false,message:error.message})
  }
}

export const deleteCommentById = async (req,res)=>{
  try {
      const {id} = req.body;
      await Comment.findByIdAndDelete(id);
      res.json({success:true, message:"Comment deleted Succesfully "})
  } catch (error) {
      res.json({success:false,message:error.message})
  }
}

export const approveCommentById = async (req,res)=>{
  try {
      const {id} = req.body;
      await Comment.findByIdAndUpdate(id,{isApproved:true});
      res.json({success:true,message:"Comment Approved Successfully"})
  } catch (error) {
     res.json({success:false,message:error.message})
  }
}