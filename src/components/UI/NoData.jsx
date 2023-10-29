import styles from "../../styles/_NoData.module.scss";

const NoData = ({ message, icon, subMessage }) => {
  return (
    <div className={styles.dataError}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>
        <p className={styles.message}>{message}</p>
        <p className={styles.subMessage}>{subMessage}</p>
      </div>
    </div>
  );
};

export default NoData;
