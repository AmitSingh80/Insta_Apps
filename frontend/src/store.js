import { configureStore } from "@reduxjs/toolkit";
import {
  
  postOfFollowingReducer,
  userReducer,
} from "./Reducers/User";
// import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing :postOfFollowingReducer,
   
  },
});

export default store;