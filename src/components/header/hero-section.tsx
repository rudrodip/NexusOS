import { siteConfig } from "@/config/site";
import Image from "next/image";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HeroPopup } from "./hero-popup-animation";

export const HeroSection = () => {
  return (
    <main className="min-h-screen mx-2">
      <section className="flex gap-6 justify-between items-center my-10 lg:my-24">
        <div className="flex-col justify-between items-center max-w-4xl">
          <h1 className="inline-block head-text blue-gradient">
            {siteConfig.name}
          </h1>
          <p className="head-text">Connecting Minds, Advancing Science</p>
          <p className="desc">{siteConfig.description}</p>
          <div>
            <div className="inline-block items-center justify-center my-5 rounded-xl">
              <Link href="/dashboard">
                <div className="w-full rounded-xl p-1 border hover:bg-primary delay-75 duration-100">
                  <div className="flex h-full w-full rounded-xl p-3 items-center justify-center bg-secondary">
                    <h2 className="font-heading blue-gradient">Contribute to open science</h2>
                    <ChevronRight />
                  </div>
                </div>
              </Link>
            </div>
            <h1 className="blue-gradient text-2xl font-extrabold font-heading leading-[1.15]">
              Supercharged by
            </h1>
            <div className="flex gap-6 flex-wrap my-3">
              <Icons.gitHub className="h-12 w-12" />
              <Icons.openai className="h-12 w-12" />
              <Image
                src="/techlogo/zenodo.svg"
                alt="zenodo"
                width={90}
                height={90}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block h-96 w-96 -z-10 opacity-30 lg:relative lg:z-0 lg:opacity-100">
          <HeroPopup />
        </div>
      </section>
      <div></div>
    </main>
  );
};
