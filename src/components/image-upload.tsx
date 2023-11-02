"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiUpload } from "react-icons/fi";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoCloudUploadOutline } from "react-icons/io5";
import { setSelectedImage } from "@/redux/features/imageUploadSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { uploadImageToCloudinary } from "@/lib/api";
import Link from "next/link";

export default function ImageUpload() {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null
  );

  const dispatch = useAppDispatch();
  const selectedImage = useAppSelector(
    (state) => state.imageUpload.selectedFile
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      dispatch(setSelectedImage(event.target.files[0]));
    }
  };

  const removeSelectedImage = () => {
    dispatch(setSelectedImage(null));
  };

  const handleImageUpload = async () => {
    if (typeof selectedImage === "undefined") return;
    setLoading(true);

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const upladPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", selectedImage as Blob);
    formData.append("upload_preset", upladPreset as string);
    formData.append("api_key", apiKey as string);

    const res = await uploadImageToCloudinary(formData);
    if (res.status === 200) {
      setLoading(false);
      // removeSelectedImage()
      setUploadedImagePath(res.data.url);
    }
    console.log(res);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className=" bg-black text-white flex items-center py-2 px-3 rounded-md hover:bg-opacity-80">
          <FiUpload size="1.2em" />
          <span className=" ml-2 text-sm">Upload Image</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" mb-3">Upload Profile Picture</DialogTitle>

          {uploadedImagePath && (
            <div>
              Image uploaded {" "}
              <Link
                className=" underline text-blue-500"
                href={uploadedImagePath}
              >
                here
              </Link>
            </div>
          )}

          <div className=" flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {selectedImage ? (
                <div className=" px-3 text-sm text-center">
                  <Image
                    width={1000}
                    height={1000}
                    src={URL.createObjectURL(selectedImage)}
                    className=" w-full object-contain max-h-16 mx-auto mt-2 mb-3"
                    alt="selectedImage"
                  />
                  {selectedImage.name}
                </div>
              ) : (
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
              <Input
                id="dropzone-file"
                accept="image/png, image/jpeg"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </DialogHeader>
        <DialogFooter className=" flex items-center justify-end gap-x-2">
          <Button
            // disabled={selectedImage}
            onClick={removeSelectedImage}
            size={"sm"}
            variant={"ghost"}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImageUpload}
            disabled={!selectedImage || loading}
            size={"sm"}
            className=" text-sm"
          >
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
