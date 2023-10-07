"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Icons } from "@/components/icons";
import { featureCardOne } from "@/types/features";

const motionProps = {
  initial: { scale: 0, opacity: 0 },
  transition: {
    type: "spring",
    damping: 20,
    stiffness: 200,
    duration: 0.3,
    ease: [0.17, 0.67, 0.83, 0.67],
  },
};

const titleMotionProps = {
  initial: { x: -20, opacity: 0 },
  transition: {
    type: "spring",
    damping: 20,
    stiffness: 200,
    duration: 0.3,
    ease: [0.17, 0.67, 0.83, 0.67],
  },
};

export const FeatureOne = ({ name, desc, FeatureCard }: featureCardOne) => {
  const ref = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(ref, {
    margin: "0px 100px -50px 0px",
  });
  const textInView = useInView(ref, {
    once: true,
    margin: "0px 100px -50px 0px",
  });

  return (
    <section className="my-10 lg:my-16">
      <div className="flex gap-3 min-h-[300px]">
        <motion.div className="flex flex-col justify-center items-center">
          <motion.div
            className="relative"
            {...motionProps}
            animate={isInView ? { scale: 1, opacity: 100 } : { scale: 0 }}
            ref={ref}
          >
            <motion.div className="icon-glow"></motion.div>
            <Icons.add className="w-8 h-8" />
          </motion.div>
          <motion.div
            className="line h-full"
            {...motionProps}
            animate={isInView ? { scale: 1, opacity: 100 } : { scale: 0 }}
            ref={ref}
          ></motion.div>
        </motion.div>
        <motion.div>
          <motion.h2
            className="text-2xl mb-2 font-heading"
            {...titleMotionProps}
            animate={textInView ? { x: 0, opacity: 100 } : { x: -20 }}
            ref={textRef}
          >
            {name}
          </motion.h2>
          <motion.h1
            className="text-4xl max-w-3xl"
            {...titleMotionProps}
            animate={textInView ? { x: 0, opacity: 100 } : { x: -20 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-primary">{desc.title}</span>
            {desc.sub}
          </motion.h1>
        </motion.div>
      </div>
      <div>
        <FeatureCard />
      </div>
    </section>
  );
};
