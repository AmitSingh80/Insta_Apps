const Post= require("../models/Post.model");
 const User = require("../models/User.model");

exports.createPost= async (req,res)=>{
    try {
        const newPostData={
            caption:req.body.caption,
            owner:req.user._id,
        };
       

      const newPost= await Post.create(newPostData);
      const user = await User.findById(req.user._id);
       user.posts.push(newPost._id);
       await user.save();


      res.status(201).json({
          success: true,
          post:newPost,
      })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: " something went worng in create post"
        })
    }

};



// delete [post]

exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      if (post.owner.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      }
  
  
  
      await post.remove();    //this line not execute see later remove() not a function error
  
      const user = await User.findById(req.user._id);
  
      const index = user.posts.indexOf(req.params.id);
      user.posts.splice(index, 1);
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Post deleted",
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// likes posts unlike posts

exports.likeAndUnlikePost = async (req,res)=>{
    try {
         const post =await Post.findById(req.params.id);

         if(!post){
            return res.status(400).json({
                success: false,
                message:" user Post not Found",
            });
         }
          
         if(post.likes.includes(req.user._id)){
            const index= post.likes.indexOf(req.user._id);
            post.likes.splice(index,1);
            await post.save();

            return res.status(200).json({
                success:true,
                message:" post unlikes",
            })
         }
            else{
                post.likes.push(req.user._id);
                await post.save();
                
                return res.status(200).json({
                    success:true,
                    message:" post likes",
                })

            }
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}


exports.getPostOfFollowing = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
  
      const posts = await Post.find({
        owner: {
          $in: user.following, // mongooes function $in:
        },
      }) .populate("owner likes comments.user");
  
      res.status(200).json({
        success: true,
        posts : posts.reverse(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };