"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { featureCardTwo } from "@/types/features";
import { Icons } from "@/components/icons";

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

export const FeatureTwo = ({
  desc,
  punchques,
  punchlines,
  link,
  FeatureCard,
}: featureCardTwo) => {
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
    <section className="relative flex gap-3 min-h-[300px] my-10 lg:my-32">
      <div className="flex gap-3 justify-between">
        <motion.div className="flex flex-col justify-center items-center">
          <motion.div
            className="relative"
            {...motionProps}
            animate={isInView ? { scale: 1, opacity: 100 } : { scale: 0 }}
            ref={ref}
          >
            <motion.div className="icon-glow"></motion.div>
            <Icons.laptop className="w-8 h-8" />
          </motion.div>
          <motion.div
            className="line h-full"
            {...motionProps}
            animate={isInView ? { scale: 1, opacity: 100 } : { scale: 0 }}
            ref={ref}
          ></motion.div>
        </motion.div>
        <motion.div className="flex flex-col justify-between">
          <motion.div className="my-4 lg:my-10">
            <motion.p
              className="text-2xl"
              {...titleMotionProps}
              animate={textInView ? { x: 0, opacity: 100 } : { x: -20 }}
              ref={textRef}
            >
              {desc}
            </motion.p>
            <motion.p
              className="my-2 text-3xl p-2 underline-animation border-b border-dashed border-primary mx-4"
              {...titleMotionProps}
              animate={textInView ? { x: 0, opacity: 100 } : { x: -20 }}
              transition={{ delay: 0.1 }}
            >
              {link.text}
            </motion.p>
          </motion.div>
          <motion.div className="my-5 lg:my-12">
            <motion.p
              className="py-1 px-3 text-sm rounded-full border border-primary inline-block"
              {...titleMotionProps}
              animate={textInView ? { x: 0, opacity: 100 } : { x: -20 }}
              transition={{ delay: 0.2 }}
            >
              {punchques}
            </motion.p>
            <motion.p
              className="head-text ml-2 lg:ml-5"
              {...titleMotionProps}
              animate={textInView ? { x: 0, opacity: 100 } : { x: -20 }}
              transition={{ delay: 0.3 }}
            >
              {punchlines[0]}
            </motion.p>
            {punchlines.slice(1).map((elem, index) => {
              return (
                <motion.p
                  key={index}
                  className="text-3xl mx-3 my-4 text-primary"
                  {...titleMotionProps}
                  animate={textInView ? { x: 0, opacity: 100 } : { x: -20 }}
                  transition={{ delay: 0.4 }}
                >
                  {elem}
                </motion.p>
              );
            })}
          </motion.div>
        </motion.div>
        <div className="hidden lg:block h-96 w-96 -z-10 opacity-30 lg:relative lg:z-0 lg:opacity-100">
          <FeatureCard />
        </div>
      </div>
    </section>
  );
};
