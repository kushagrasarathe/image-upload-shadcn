import { configureStore } from "@reduxjs/toolkit";
import { createStoreHook } from "react-redux";
import imageUploadSlice from "./features/imageUploadSlice";

export const store = configureStore({
  reducer: {
    imageUpload: imageUploadSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
