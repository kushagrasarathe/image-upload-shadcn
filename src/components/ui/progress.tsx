import React from "react";

export default function RadialProgress({ progress }: { progress: number }) {
  return (
    <div
      x-data="scrollProgress"
      className="  inline-flex items-center justify-center overflow-hidden rounded-full "
    >
      <svg className=" w-20 h-20">
        <circle
          className="text-gray-300"
          strokeWidth={"4"}
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className="text-black"
          strokeWidth="4"
          strokeDasharray={30 * 2 * Math.PI}
          strokeDashoffset={100 - (progress / 100) * 100}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>
      <span className="absolute text-sm text-black" x-text="`${percent}%`">
        {progress}%
      </span>
    </div>
  );
}
