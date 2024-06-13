import { configureStore } from "@reduxjs/toolkit";
import {
  
  userReducer,
} from "./Reducers/User";
// import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";

const store = configureStore({
  reducer: {
    user: userReducer,
   
  },
});

export default store;