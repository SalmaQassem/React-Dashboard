import styles from "../../styles/_Overlay.module.scss";
import { useContext } from "react";
import AsideContext from "../../store/aside-context";
const Overlay = () => {
  const context = useContext(AsideContext);
  return (
    <div
      className={
        context.isOpened ? styles.overlay : `${styles.overlay} ${styles.close}`
      }
    />
  );
};

export default Overlay;
