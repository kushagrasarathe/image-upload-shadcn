import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import sample from "@/assets/sample.jpg";
import { Button } from "./ui/button";
import { MdDeleteOutline } from "react-icons/md";
import UploadImage from "./image-upload";

export default function UserCard() {
  return (
    <Card className=" px-12 py-10 tablet:min-w-[500px] shadow-md">
      {/* <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader> */}
      <CardContent className=" px-0 flex items-stretch justify-normal gap-x-6">
        <Image
          className=" shadow-md w-24 h-24 border rounded-md object-cover"
          src={sample}
          alt="sample pfp"
        />
        <div className=" space-y-2">
          <h1 className=" font-semibold">Profile Picture</h1>
          <div className=" text-gray-500 text-xs">
            We support PNGs, JPEGs under 10MB
          </div>
          <div className=" flex items-center justify-normal gap-x-3">
            <UploadImage />
            <Button size={"icon"} variant={"outline"}>
              <MdDeleteOutline size="1.4em" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className=" border-t pt-5 pb-0 flex items-center justify-end gap-x-3">
        <Button variant={"outline"}>Cancel</Button>
        <Button>Update</Button>
      </CardFooter>
    </Card>
  );
}
