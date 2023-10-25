import styles from "../../styles/_Overlay.module.scss";

const Overlay = ({ itemClass }) => {
  return <div className={`${styles.overlay} ${itemClass}`} />;
};

export default Overlay;
