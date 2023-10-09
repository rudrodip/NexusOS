import { Card, CardHeader, CardContent } from "@/components/ui/card";
import RocketLottieAnimation from "../header/rocket-lottie-animation";
import Image from "next/image";

export const FeatureCardTwo = () => {
  return (
    <Card className="w-auto mx-1">
      <CardHeader>Nexbee can explain repository</CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="col-span-2 bg-background rounded-md">
            <Image 
              src="/gifs/ai-repo.gif"
              alt=""
              width={1920}
              height={1080}
              className="rounded-md"
            />
          </div>
          <div className="h-96">
            <RocketLottieAnimation />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
