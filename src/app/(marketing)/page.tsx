'use client'

import { HeroSection } from "@/components/header/hero-section";
import { Features } from "@/components/feature/features";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Features />
      <Features />
      <Features />
    </main>
  );
}
