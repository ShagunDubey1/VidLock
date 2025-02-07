import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";

export default async function Home() {
  const session = await auth();

  if(!session){
    redirect("/api/auth/signin");
  }

  return (
    <main className=" flex min-h-screen flex-col items-center justify-center py-24">
        <VideoPlayer />
    </main>
  );
}
