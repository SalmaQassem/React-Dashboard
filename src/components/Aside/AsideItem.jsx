import styles from "../../styles/_AsideItem.module.scss";
import { NavLink } from "react-router-dom";
const AsideItem = ({ name, icon, url, End }) => {

  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        isActive ? `${styles.item} ${styles.active}` : styles.item
      }
      end={End}
    >
      <span>{name}</span>
      <div className={styles.icon}>{icon}</div>
    </NavLink>
  );
};

export default AsideItem;
