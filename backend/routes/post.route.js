const express= require("express");
const { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing } = require("../controllers/post.controller");
const { isAuthenticated } = require("../authentication/auth");
const router= express.Router();



router.route("/post/upload").post(isAuthenticated, createPost);
router.route("/post/:id").get(isAuthenticated,likeAndUnlikePost);
router.route("/post/delete/:id").delete(isAuthenticated,deletePost);

router.route("/posts").get(isAuthenticated,getPostOfFollowing);


module.exports=router;