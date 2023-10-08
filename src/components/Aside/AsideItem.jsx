import styles from "../../styles/_AsideItem.module.scss";
import { Link } from "react-router-dom";
const AsideItem = ({ name, icon, url }) => {
  return (
    <Link to={url} className={styles.item}>
      <span>{name}</span>
      <div className={styles.icon}>{icon}</div>
    </Link>
  );
};

export default AsideItem;
