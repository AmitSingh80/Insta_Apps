const { options } = require("../app");
const User = require("../models/User.model");



//User Register

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "user already exit"
            });
        }

        user = await User.create({
             name, 
             email, 
             password
            });

        // res.status(201).json({
        //     success: true,
        //     data: user,
        // });



        
       // user register then automatically go to login page
        const token= await user.genrateToken();

        const options = {
          expires: new Date(Date.now()+30*24*60*60*1000),
          httpOnly:true,
        };
       res.status(201).cookie("token",token,options).json({
           success: true,
           user,
           token,
           message: " user Register successfully"
       })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


//  user  login

exports.login =async (req,res)=>{
  try {
         const {email,password}=req.body;
         const user= await User.findOne({email}).select("+password");
         if(!user){
           return res.status(400).json({
                success:false,
                message: " User doest not exits"
            })
         }
         const isMatch= await user.matchPassword(password);
         if(!isMatch){
            return  res.status(400).json({
                success: false,
                message:" Incorrect password",
            })
         }
         const token= await user.genrateToken();
         

         // automatically account logout date
          const options = {
            expires: new Date(Date.now()+30*24*60*60*1000),
            httpOnly:true,
          };
         res.status(201).cookie("token",token,options).json({
             success: true,
             user,
             token,
             message : " User Login successfully"
         })

  } catch (error) {
     res.status(500).json({
        success: false,
        message:error.message
     })
    
  }
}

//logout
exports.logout =async (req,res)=>{
   try {
    res.status(200).cookie("token",null,{
      expires:new Date(Date.now()),
      httpOnly:true,}).json({
      success:true,
      message: " user logout"
    })
    
   } catch (error) {
    res.status(500).json({
      success: false,
      message:error.message
    })
    
   }
}







// follower
exports.followUser = async (req, res) => {
    try {
      const userToFollow = await User.findById(req.params.id);
      const loggedInUser = await User.findById(req.user._id);
  
      if (!userToFollow) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      if (loggedInUser.following.includes(userToFollow._id)) {
        const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
        const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);
  
        loggedInUser.following.splice(indexfollowing, 1);
        userToFollow.followers.splice(indexfollowers, 1);
  
        await loggedInUser.save();
        await userToFollow.save();
  
        res.status(200).json({
          success: true,
          message: "User Unfollowed",
        });
      } else {
        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);
  
        await loggedInUser.save();
        await userToFollow.save();
  
        res.status(200).json({
          success: true,
          message: "User followed",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

//update Password
exports.updatePassword =async (req,res)=>{
    try {
          const user =await User.findById(req.user._id).select("+password");
          const {oldPassword ,newPassword}=req.body;

          if(!oldPassword || !newPassword){
            return res.status(400).json({
              success: false,
              message: " please provide old and new password"
            })
          }
           
          const isMatch= await user.matchPassword(oldPassword);

          if(!isMatch){
            return res.status(400).json({
              success:false,
              message: " incorrect password"
            })
          }
          user.password =newPassword;
          await user.save();
          res.status(200).json({
            success: true,
            message: " password updated successfully"
          })


    } catch (error) {
      res.status(500).json({
        success:false,
        message:error.message
      })
      
    }
}


//update profile
   exports.updateProfile = async (req,res)=>{
    try {
          const user = await User.findById(req.user._id);
          const { name ,email} =req.body;
           
          if(name){
            user.name = name;
          }

          if(email){
            user.email =email;
          }
         

          await user.save();
          res.status(200).json({
            success: true,
            message: " profile updated successfully"
          })


    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        })
    }
   }

   //my profile

   exports.myProfile = async (req, res)=>{
        try {

            const user = await  User.findById(req.user._id);
            res.status(200).json({
              success:true,
              user,
            });

          
        } catch (error) {
          res.status(500).json({
            success: false,
            message: error.message
          })
          
        }
   };


   // get All Users 
  exports.getAllUsers= async (req, res)=>{
    try {
         const users = await User.find({});

         res.status(200).json({
          success: true,
          users,
         })
    } catch (error) {
      res.status(400).json({
        success:false,
        message:error.message
      })
      
    }
  }