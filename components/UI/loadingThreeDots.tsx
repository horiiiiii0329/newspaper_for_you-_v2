import { motion } from "framer-motion";
import styles from "./LoadingThreeDots.module.scss";

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "50%",
  },
  end: {
    y: "150%",
  },
};

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
};

function LoadingThreeDots() {
  return (
    <motion.div
      className={styles.container}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        className={styles.circle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className={styles.circle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className={styles.circle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
}

export default LoadingThreeDots;
