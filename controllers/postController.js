const Post = require("../models/PostModel");

const getAllPostsController = async (req, res, next) => {
    try{
    const posts = await Post.find();
    if(posts){
       res.status(200).json({
           status:"success",
           message:"post retrieved",
           results:posts.length,
           data:posts
       })
    }
    }catch(e){
   res.status(400).json({
       status:"fail"
   });
    }
}

const getPostController = async (req, res, next)=> {
    try{
        const Id = req.params.id;
        
        console.log(Id)
        const post = await Post.findById(Id);
        if(post){
           res.status(201).json({
               status:"success",
               message:"post retrieved",
               data:post
           })
        }
        }catch(e){
       res.status(400).json({
           status:"fail"
       });

    }
}

//@desc   Create Course
//@route  POST /api/v1/post
//@access Private
const createPostController = async(req, res, next) => {
    try {
        const createdpost = await Post.create(req.body);
        if(createdpost)
        console.log(createdpost)
       return  res.status(201).json({
            status: 'success',
            message: 'post created successfully',
            data: createdpost
        });
    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: 'post could not be created successfully',
            data: {}
        });
    }
};


//@desc   Update post
//@route  PUT /api/v1/post/:id
//@access Private
const updatePostController = async(req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });
        res.status(201).json({
            status: 'success',
            message: `post updated successfully`,
            data: post
        });
    } catch (err) {
        return next(err);
    }
};

//@desc   Update post
//@route  PUT /api/v1/post/:id
//@access Private
const deletePostController = async(req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: 'success',
            message: `post deleted successfully`,
            data: {}
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getAllPostsController,
    getPostController,
    createPostController,
    updatePostController,
    deletePostController
}