const app =require("./app");
const { connectDB } = require("./config/db");

 app.get("/ping",(req,res)=>{
     res.send("ping pong amit");
 })

 


connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at : ${process.env.PORT}`);
})