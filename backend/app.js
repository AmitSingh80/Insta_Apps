const express = require("express")
const app = express();
const cors=require("cors");
const cookieParser = require("cookie-parser")

require("dotenv").config({ path:"backend/config/.env" });


// using middlewares
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


//importing Routes

const post =require("./routes/post.route");
const user= require("./routes/user.route");

//using routes
app.use("/post_v1",post);
app.use("/post_v1",user);


module.exports = app;