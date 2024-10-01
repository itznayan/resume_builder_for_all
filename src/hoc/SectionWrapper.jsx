import { motion } from "framer-motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        initial={{ x: -500, y: -500, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
