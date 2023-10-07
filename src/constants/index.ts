export const motionProps = {
  initial: { x: -20, opacity: 0 },
  transition: {
    type: "spring",
    damping: 20,
    stiffness: 200,
    duration: 0.3,
    ease: [0.17, 0.67, 0.83, 0.67],
  },
};