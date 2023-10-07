"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const image = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const HeroPopup = () => {
  return (
    <motion.section
      className="relative w-[500px] h-[500px]"
      variants={variants}
      initial="hidden"
      whileInView="show"
    >
      <motion.div className="absolute right-0 -top-20" variants={image}>
        <Image src="/images/test.jpg" alt="image" width={600} height={600} className="shadow-lg rounded-lg" />
      </motion.div>
      <motion.div className="absolute -left-10 bottom-3" variants={image}>
        <Image src="/images/test.jpg" alt="image" width={200} height={200} className="shadow-lg rounded-lg" />
      </motion.div>
      <motion.div className="absolute -right-10 top-3" variants={image}>
        <Image src="/images/test.jpg" alt="image" width={200} height={200} className="shadow-lg rounded-lg" />
      </motion.div>
    </motion.section>
  );
};
