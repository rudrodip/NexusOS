'use client'

import Lottie from "lottie-react";
import rocketAnimation from '@public/lottie/rocket-lottie.json'

export default function RocketLottieAnimation(){
  return (
    <Lottie animationData={rocketAnimation} className="delay-100 transition-all ease-in-out hover:rotate-30" />
  )
}