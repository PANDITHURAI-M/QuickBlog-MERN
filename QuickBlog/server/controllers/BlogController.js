import fs from "fs";
import imageKit from "../configs/imagekit.js";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import main from "../configs/gemini.js";


export const addBlog = async (req,res)=>{
  try {
    const {title,subTitle,description,category,isPublished}=req.body.blog ? JSON.parse(req.body.blog) : req.body;
    const imageFile = req.file;
    
    // check if all fields are present
    if(!title || !description || !category || !imageFile){
        return res.json({succes:false,message :"Missing requied fields"})
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    // Upload image to ImageKit
    const response = await imageKit.upload({
        file : fileBuffer,
        fileName: imageFile.originalname,
        folder:"/blogs"
    })
    
    //optimization through imagekit URL transformation
    const optimizedImageUrl = imageKit.url({
        path:response.filePath , 
        transformation :[
            {quality:'auto'}, // Auto compression
            {format:'webp'}, // convert to modern format
            {width:'1280'}  // width resizing
        ]
    });
    
    const image = optimizedImageUrl;

    await Blog.create({title,subTitle,description,category,image,isPublished});

    res.json({success:true,message:'Blog added Successfully'});

  } catch (error) {
    res.json({success:false,message:"Not Added"});
  }
}

export const getAllBlogs = async (req,res) =>{
   try {
       const blogs = await Blog.find({isPublished:true});
       res.json({success:true ,blogs })
   } catch (error) {
       res.json({success:false,message:error.message});
   }
}

export const getBlogById = async (req,res)=>{
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.json({success:false , message:"Blog not found"})
        }
        res.json({success:true,blog})
    } catch (error) {
         res.json({success:false,message:error.message});
    }
}

export const deleteBlogById = async (req,res)=>{
    try{
        const {id} = req.body;
        await Blog.findByIdAndDelete(id);
        // Delete All commetns associated with the blog
        await Comment.deleteMany({blog:id});
        res.json({success:true , message:'Blog deleted Successfully'})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

export const togglePublish = async ( req, res) =>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success:true, message:"Blog status updated"})
    } catch (error) {
         res.json({success:false,message:error.message})
    }
}

export const addComment = async(req,res)=>{
    try {
        const { blog, name , content} =req.body;
        await Comment.create({blog,name,content});
        res.json({success:true , message:"Comment added for review"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const getBlogComments = async(req,res)=>{
    try {
        const { blogId} =req.body;
        const comments = await Comment.find({blog:blogId , isApproved:true}).sort({createdAt:-1});
        res.json({success:true,comments});
       
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const generateContent = async (req,res) =>{

    try {
        const {prompt} = req.body;
        const content =  await main(prompt+' Generate a blog content for this topic in simple text format');
        res.json({success : true , content})
    } catch (error) {
         res.json({success:false , message:error.message})
    }
}