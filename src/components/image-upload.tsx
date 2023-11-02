"use client";

import React from "react";
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
import { setSelectedFile } from "@/redux/features/imageUploadSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function ImageUpload() {
  const dispatch = useAppDispatch();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      dispatch(setSelectedFile(event.target.files[0]));
    }
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

          <div className=" flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className=" border p-2 rounded-md">
                <IoCloudUploadOutline size="1.6em" />
              </div>
              <div className=" text-center">
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Drag an image</span>
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-400">
                  Click to upload &#40; image should be 500x500 px & under 10 MB
                  &#41;
                </p>
              </div>
              <Input
                id="dropzone-file"
                accept="image/png, image/jpeg"
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </DialogHeader>
        <DialogFooter className=" flex items-center justify-end gap-x-2">
          <Button size={"sm"} variant={"ghost"}>
            Cancel
          </Button>
          <Button size={"sm"} className=" text-sm">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
