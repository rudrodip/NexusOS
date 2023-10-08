'use client'

import Lottie from "lottie-react";
import nasaAnimation from '@public/lottie/nasa-lottie.json'

export default function NasaLottieAnimation(){
  return (
    <Lottie animationData={nasaAnimation} className="delay-100 transition-all ease-in-out hover:rotate-30" />
  )
}