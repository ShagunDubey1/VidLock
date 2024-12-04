"use client"

import { useCheckPremium } from '@/lib/hooks/users/use-check-permission'
import React from 'react'
import { UpgradeBtn } from './upgradeBtn'
import { useSignedUrl } from '@/lib/hooks/videos/use-signed-url'


export const VideoPlayer = () => {
  const { data: isPremium, isError, isPending} = useCheckPremium();
  const { 
    data: sigendUrl, 
    isPending: isSignedUrlPending,
    isError: isSignedUrlError
  } = useSignedUrl("https://iframe.mediadelivery.net/embed/346621/acbc605a-4c32-4475-bf25-126bb1619eba")

  if(isPending || isSignedUrlPending){ 
    return ( 
    <div className=' flex p-4 justify-center items-center'><h2>Loading...</h2></div>
    )
  }

  if(isError || isSignedUrlError){
    return ( 
      <div className=' flex flex-col gap-4 p-4 justify-center items-center'>
        <h2>Error</h2>
      </div>
    )
  }

  // if(!isPremium || !sigendUrl){
  //   return ( 
  //     <div className=' flex flex-col gap-4 p-4 justify-center items-center'>
  //       <h2>Upgrade to premium to watch this video</h2>
  //       <UpgradeBtn />
  //     </div>
  //   )
  // }

  return (
    <iframe 
      src={sigendUrl}
      loading="lazy" 
      className=" border-none absolute t-0 h-full w-full" 
      allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"   
    ></iframe>
  )
}
