
import  axios from "axios";

export const loginUser = (email , password) => async(dispatch)=>{
  

    try {
          
        dispatch({
            type:"LoginRequest"
        })

        const {data} = await axios.post("/post_v1/login", {email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"LoginSuccess",
            payload: data.user,
        })


    } catch (error) {
        dispatch({
            type:"LoginFailure",
            payload:error
        })
    }
}

//loaduser 

export const loadUser = () => async(dispatch)=>{
    try {
          
        dispatch({
            type:"LoadUserRequest",
        });

        const {data} = await axios.get("/post_v1/myProfile");
            
            

        dispatch({
            type:"LoadUserSuccess",
            payload: data.user,
        });


    } catch (error) {
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data.message,
        })
    }
}

//getfollowing POST

export const getFollowingPosts = () => async (dispatch) => {
    try {
      dispatch({
        type: "postOfFollowingRequest",
      });
  
      const { data } = await axios.get("/post_v1/posts");
      dispatch({
        type: "postOfFollowingSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "postOfFollowingFailure",
        payload: error.response.data.message,
      });
    }
  };