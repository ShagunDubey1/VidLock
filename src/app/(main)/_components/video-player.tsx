"use client"

import { useCheckPremium } from '@/lib/hooks/users/use-check-permission'
import React from 'react'

export const VideoPlayer = () => {
  const { data: isPremium, isError, isPending} = useCheckPremium();

  if(isPending){ 
    return ( 
    <div className=' flex p-4 justify-center items-center'><h2>Loading...</h2></div>
    )
  }

  if(isError){
    return ( 
      <div className=' flex p-4 justify-center items-center'>
        <h2>Upgrade to premium to watch this video</h2>

      </div>
    )
  }

  if(!isPremium){
    return ( 
      <div className=' flex flex-col p-4 justify-center items-center'>
        <h2></h2>
      </div>
    )
  }

  return (
    <iframe 
      src="https://iframe.mediadelivery.net/embed/346621/acbc605a-4c32-4475-bf25-126bb1619eba?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
      loading="lazy" 
      className=" border-none absolute t-0 h-full w-full" 
      allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"   
    ></iframe>
  )
}
