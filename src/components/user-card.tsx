"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import sample from "@/assets/sample.jpg";
import { Button } from "./ui/button";
import { MdDeleteOutline } from "react-icons/md";
import UploadImage from "./image-upload";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUserData } from "@/lib/api";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { setUploadedImagePath } from "@/redux/features/imageUploadSlice";
import ImageUploadModal from "./image-upload-modal";

export default function UserCard() {
  const dispatch = useAppDispatch();
  const uploadedImagePath = useAppSelector(
    (state) => state.imageUpload.uploadedImagePath
  );

  const mutation = useMutation({
    mutationFn: updateUserData,
  });

  const handleUpdateUserData = async () => {
    if (!uploadedImagePath) {
      return toast.error("Upload new image first...");
    }

    if (mutation.isError) {
      return toast.error(`${mutation.error.message}`);
    }
    mutation.mutate({ image: uploadedImagePath as string });
  };

  return (
    <Card className=" px-12 py-10 tablet:min-w-[500px] shadow-md">
      <CardContent className=" px-0 flex items-stretch justify-normal gap-x-6">
        <Image
          width={1000}
          height={1000}
          className=" shadow-md w-24 h-24 border rounded-md object-cover"
          src={uploadedImagePath ? uploadedImagePath : sample}
          alt="sample pfp"
        />
        <div className=" space-y-2">
          <h1 className=" font-semibold">Profile Picture</h1>
          <div className=" text-gray-500 text-xs">
            We support PNGs, JPEGs under 10MB
          </div>
          <div className=" flex items-center justify-normal gap-x-3">
            <ImageUploadModal />
            <Button size={"icon"} variant={"outline"}>
              <MdDeleteOutline size="1.4em" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className=" border-t pt-5 pb-0 flex items-center justify-end gap-x-3">
        <Button
          onClick={() => dispatch(setUploadedImagePath(null))}
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button onClick={handleUpdateUserData} disabled={!uploadedImagePath}>
          Update
        </Button>
      </CardFooter>
    </Card>
  );
}
