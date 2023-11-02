import UserCard from "@/components/user-card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <UserCard />
    </main>
  );
}
