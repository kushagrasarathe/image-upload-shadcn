import axios, { AxiosProgressEvent } from "axios";

// const API_BASE_URL = "https://6543665101b5e279de204a4d.mockapi.io"; // Replace with your dummy API URL

export const uploadImageToCloudinary = async (
  formData: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    formData,
    {
      onUploadProgress,
    }
  );

  return response;
};
