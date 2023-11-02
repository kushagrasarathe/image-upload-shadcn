import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ImageUploadState {
  selectedFile: File | null;
}

const initialState: ImageUploadState = { selectedFile: null };

export const imageUploadSlice = createSlice({
  name: "imageUpload",
  initialState,
  reducers: {
    setSelectedFile: (state, action: PayloadAction<File | null>) => {
      state.selectedFile = action.payload;
    },
  },
});

export const { setSelectedFile } = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
