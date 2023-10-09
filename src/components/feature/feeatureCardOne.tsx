import { Card, CardHeader, CardContent } from "@/components/ui/card";
import NasaLottieAnimation from "../header/nasa-lottie-animation";
import Image from "next/image";

export const FeatureCardOne = () => {
  return (
    <Card className="w-auto mx-1">
      <CardHeader>Find contributors</CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="col-span-2 bg-background rounded-md">
            <Image 
              src="/gifs/ai-find.gif"
              alt=""
              width={1920}
              height={1080}
              className="rounded-md"
            />
          </div>
          <div className="h-96">
            <NasaLottieAnimation />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
