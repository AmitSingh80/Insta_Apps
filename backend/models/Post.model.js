 const mongoose= require("mongoose")


 const postSchema = new mongoose.Schema({
    caption:  String,
    image:{
        public_id: String,
        url: String,
    },
   
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },

    createdAt:{
        type:Date,
        default: Date.now,

    },

    likes: [
        {
            type :mongoose.Schema.Types.ObjectId,
            ref: "user",

    }],
    comment:[
        {
            user:{
                type:mongoose.Types.ObjectId,
                ref:"user",
            },
            comment:{
                type: String,
                require: true,
            }
        }
    ]


    

 });


 module.exports =mongoose.model("post",postSchema);