import React from "react";
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
    return <div className="post">
        <div className="postHeader"></div>
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
        <button>
            <FavoriteBorder/>
        </button>
        <button>
            <ChatBubbleOutline/>
        </button>
        <button>
            <DeleteOutline/>
        </button>
       </div>

    </div>
}

export default Post;