import styles from "../../styles/_AsideItem.module.scss";

const AsideItem = ({ name, icon }) => {
  return (
    <div className={styles.item}>
      <span>{name}</span>
      <div className={styles.icon}>{icon}</div>
    </div>
  );
};

export default AsideItem;
