import React, { useState } from "react";
import "./Post.css";
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
  } from "@mui/icons-material"
import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Post =({
    postId,
    caption,
    postImage,
    likes=[],
    comments=[],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
}) =>{
    const [liked,setLiked] =useState (false);
    const handleLike =()=>{
        setLiked(!liked)
    }
    return <div className="post">
        <div className="postHeader">
         {isAccount ?(
            <button>
                <MoreVert/>
            </button>
         ):null} 
       
        </div>
        <img src={postImage} alt="Post"/>

       <div className="postDetails">
       <Avatar src={ownerImage} alt="User" sx={{
            height:"3vmax",
            width:"3vmax",
       }} />
       <Link to={`/user/${ownerId}`}>
       <Typography fronweight ={700}>{ownerName } </Typography>
        </Link>

        <Typography
        frontweight={100}
        color="rgba(0,0,0,0.582)"
        style={{alignSelf:"center"}}
        >
            {caption}
        </Typography>
       </div>

       <button style={{
           border:"none",
           backgroundColor: "white",
           cursor :"pointer",
           margin: "1vmax 2vmax",
       }}
       >
       <Typography>5 Likes</Typography>
       </button>

       <div className="postFooter">
        <button onClick={handleLike}>
            {liked ? <Favorite style={{color:"red"}}/>:
            <FavoriteBorder/>}
        </button>
        <button>
            <ChatBubbleOutline/>
        </button>
         {isDelete ?(
             <button>
             <DeleteOutline/>
         </button>
         ) :null }
       </div>

    </div>
}

export default Post;