import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated : false,
};

export const userReducer = createReducer(initialState,(builder)=> {
  builder
    .addCase ('LoginRequest', (state) => {
       state.loading = true;
  })
      .addCase ('LoginSuccess', (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  })
  .addCase('LoginFailure' ,(state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  })

  .addCase('RegisterRequest', (state) => {
    state.loading = true;
  })
  .addCase('RegisterSuccess', (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  })

  .addCase('RegisterFailure', (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  })

  .addCase('LoadUserRequest', (state) => {
    state.loading = true;
  })

  .addCase('LoadUserSuccess', (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  })

  .addCase('LoadUserFailure', (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  })

//   LogoutUserRequest: (state) => {
//     state.loading = true;
//   },
//   LogoutUserSuccess: (state) => {
//     state.loading = false;
//     state.user = null;
//     state.isAuthenticated = false;
//   },
//   LogoutUserFailure: (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//     state.isAuthenticated = true;
//   },

  .addCase('clearErrors', (state) => {
    state.error = null;
  })
});

// export const postOfFollowingReducer = createReducer(initialState, {
//   postOfFollowingRequest: (state) => {
//     state.loading = true;
//   },
//   postOfFollowingSuccess: (state, action) => {
//     state.loading = false;
//     state.posts = action.payload;
//   },
//   postOfFollowingFailure: (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//   },
//   clearErrors: (state) => {
//     state.error = null;
//   },
// });

// export const allUsersReducer = createReducer(initialState, {
//   allUsersRequest: (state) => {
//     state.loading = true;
//   },
//   allUsersSuccess: (state, action) => {
//     state.loading = false;
//     state.users = action.payload;
//   },
//   allUsersFailure: (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//   },
//   clearErrors: (state) => {
//     state.error = null;
//   },
// });

// export const userProfileReducer = createReducer(initialState, {
//   userProfileRequest: (state) => {
//     state.loading = true;
//   },
//   userProfileSuccess: (state, action) => {
//     state.loading = false;
//     state.user = action.payload;
//   },
//   userProfileFailure: (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//   },
//   clearErrors: (state) => {
//     state.error = null;
//   },
// });