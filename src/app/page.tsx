"use client";
import ImageUpload from "@/components/image-upload";
import { useState } from "react";

export default function Home() {
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleUploadComplete = (url: string) => {
    setImageURL(url);
  };

  return (
    <main className="min-h-[90vh] flex items-center justify-center p-10">
      <div className="w-6/12 h-[300px]">
        <ImageUpload onUploadComplete={handleUploadComplete} />
      </div>
    </main>
  );
}
