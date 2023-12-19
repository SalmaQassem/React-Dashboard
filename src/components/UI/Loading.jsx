import styles from "../../styles/_Loading.module.scss";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.circule}>
        <motion.div
          className={styles.innerCircule}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          animate={{
            rotate: 360,
          }}
          //exit={{ opacity: 0, left: "50%", top: "50%", x: "-50%", y: "20%" }}
        />
      </div>
    </div>
  );
};

export default Loading;
