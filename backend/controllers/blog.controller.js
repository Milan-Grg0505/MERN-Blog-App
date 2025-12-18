import { Blog } from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const createBlog = async (req,res) =>{
  try {
    const {title,category} = req.body;

    if(!title || !category){
      res.status(400).json({
        message:"Blog title and category is required",
        success:false,
      });
    }

    const blog = await Blog.create({
      title,
      category,
      author:req.id
    });

    return res.status(201).json({
      success:true,
      blog,
      message:"Blog created successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:"Failed to create blog",
      success:false,
    })
  }
}


//update blog
export const updateBlog = async(req,res) =>{
  try {
    const blogId = req.params.blogId;

    const {title,subtitle,description,category} = req.body;
    const file = req.file;

    let blog = await Blog.findById(blogId);
    if(!blog){
      return res.status(404).json({
        message:"Blog not found",
        success:false
      })
    }

    let thumbnail;
    if(file){
      const fileUri = getDataUri(file);
      thumbnail = await cloudinary.uploader.upload(fileUri);
    }
    
    const updateData = {title,subtitle,description,category,author:req.id,thumbnail:thumbnail?.secure_url};
    blog = await Blog.findByIdAndUpdate(blogId,updateData,{new:true});
    res.status(200).json({
      success:true,
      blog,
      message:"Blog updated successfully"
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Failed to update blog"
    })
    
  }
}