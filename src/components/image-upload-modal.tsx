"use client";

import React, { useState } from "react";
import { useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiUpload } from "react-icons/fi";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from "next/image";
import {
  setSelectedImage,
  setUploadedImagePath,
} from "@/redux/features/imageUploadSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { uploadImageToCloudinary } from "@/lib/api";
import RadialProgress from "./ui/progress";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const upladPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

export default function ImageUploadModal() {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const dispatch = useAppDispatch();
  const selectedImage = useAppSelector(
    (state) => state.imageUpload.selectedFile
  );
  const uploadedImagePath = useAppSelector(
    (state) => state.imageUpload.uploadedImagePath
  );

  const onUploadProgress = (progressEvent: any) => {
    const percentage = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(percentage);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      // dispatch(setSelectedImage(event.target.files[0]));
      const selectedImage = event.target.files[0];
      dispatch(setSelectedImage(selectedImage));
      handleImageUpload(selectedImage);
    }
  };

  const removeSelectedImage = () => {
    setLoading(false);
    dispatch(setUploadedImagePath(null));
    dispatch(setSelectedImage(null));
  };

  const handleImageUpload = async (image: File) => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", upladPreset as string);
    formData.append("api_key", apiKey as string);

    const res = await uploadImageToCloudinary(formData, onUploadProgress);
    if (res.status === 200) {
      setLoading(false);
      dispatch(setUploadedImagePath(res.data.url));
    }

    console.log(res);
    return res;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedImage = acceptedFiles[0];
      dispatch(setSelectedImage(selectedImage));
      handleImageUpload(selectedImage);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-black text-white flex items-center py-2 px-3 rounded-md hover:bg-opacity-80">
          <FiUpload size="1.2em" />
          <span className="ml-2 text-sm">Upload Image</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" mb-3">Upload Profile Picture</DialogTitle>

          <div
            {...getRootProps()}
            className=" flex items-center justify-center w-full"
          >
            <label
              htmlFor="dropzone-file"
              className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {loading && (
                <div className=" text-center max-w-md  ">
                  <RadialProgress progress={progress} />
                  <p className=" text-sm font-semibold">Uploading Picture</p>
                  <p className=" text-xs text-gray-400">
                    Do not refresh or perform any other action while the picture
                    is being upload
                  </p>
                </div>
              )}

              {!loading && !uploadedImagePath && (
                <div className=" text-center">
                  <div className=" border p-2 rounded-md max-w-min mx-auto">
                    <IoCloudUploadOutline size="1.6em" />
                  </div>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Drag an image</span>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-400">
                    Click to upload &#40; image should be 500x500 px & under 10
                    MB &#41;
                  </p>
                </div>
              )}

              {uploadedImagePath && !loading && (
                <div className="text-center">
                  <Image
                    width={1000}
                    height={1000}
                    src={uploadedImagePath}
                    className=" w-full object-contain max-h-16 mx-auto mt-2 mb-3 opacity-70"
                    alt="uploaded image"
                  />
                  <p className=" text-sm font-semibold">Picture Uploaded</p>
                  <p className=" text-xs text-gray-400">
                    Click submit to upload the picture
                  </p>
                </div>
              )}
            </label>

            <Input
              {...getInputProps()}
              id="dropzone-file"
              accept="image/png, image/jpeg"
              type="file"
              className="hidden"
              disabled={loading || uploadedImagePath !== null}
              onChange={handleImageChange}
            />
          </div>
        </DialogHeader>

        <DialogFooter className=" flex items-center justify-end gap-x-2">
          <DialogClose asChild>
            <Button
              onClick={removeSelectedImage}
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              // onClick={}
              disabled={!selectedImage || loading}
              size={"sm"}
              className=" text-sm"
            >
              {loading ? "Uploading..." : "Submit"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
