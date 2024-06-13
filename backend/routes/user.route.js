const express= require("express");

const { register, login, followUser, logout, updatePassword, updateProfile, myProfile, getAllUsers } = require("../controllers/user.controller");
const { isAuthenticated } = require("../authentication/auth");

const router= express.Router();


 router.route("/Register").post(register);

 router.route("/login").post(login);
 router.route("/logout").get(logout);
 
 router.route("/follower/:id").get(isAuthenticated,followUser);

 router.route("/update/password").put(isAuthenticated,updatePassword);

 router.route("/update/profile").put(isAuthenticated,updateProfile);

 router.route("/myProfile").get(isAuthenticated,myProfile);

 router.route("/getAllUsers").get(isAuthenticated,getAllUsers);



module.exports=router;