const mongoose= require("mongoose")
const bcrypt= require ("bcrypt")
const jwt= require("jsonwebtoken");


const userSchema = new mongoose.Schema({
   
   name:{
    type: String,
    required:[true,"please enter a name"],
   },

   email:{
    type: String,
    required:[true," please enter your  an email"],
    unique:[true," email already exit"],
   },

   password:{
    type: String,
    required:[true, "please enter your password"],
    minlenght:[6," password must be at leat 6 characters"],
    select: false
   },
   
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:" post",
    }],
    
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",

    }],

    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",

    }],

  
   
});
      // password hash code to bcrypt

    userSchema.pre("save", async function(next){
          if(this.isModified("password")){
          this.password = await bcrypt.hash(this.password,10);

          }
          next();
    });

  
     userSchema.methods.matchPassword=async function(password){
        return await bcrypt.compare(password,this.password);
    };

    userSchema.methods.genrateToken= function(){
           return jwt.sign({_id:this._id},process.env.JWT_SECRET);
    }
    

module.exports =mongoose.model("user",userSchema);