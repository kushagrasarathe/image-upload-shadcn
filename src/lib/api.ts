import axios, { AxiosProgressEvent } from "axios";
import toast from "react-hot-toast";

export interface UserData {
  image: string;
}

const API_BASE_URL = "https://reqres.in/api/users";

export const updateUserData = async (data: UserData) => {
  const response = await axios.post(API_BASE_URL, data);
  if (response.status === 201) {
    toast.success("User profile updated successfully...");
    return response.data;
  } else {
    toast.error(response.statusText);
    // return console.log(response);
    throw new Error(response.statusText);
  }
};

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
