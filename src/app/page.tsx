import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if(!session){
    redirect("/api/auth/signin");
  }

  return (
    <main className=" flex min-h-screen flex-col items-center justify-center py-24">
        <iframe 
          src="https://iframe.mediadelivery.net/embed/346621/acbc605a-4c32-4475-bf25-126bb1619eba?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
          loading="lazy" 
          className=" border-none absolute t-0 h-full w-full" 
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"   
        ></iframe>
    </main>
  );
}
