import styles from "../../styles/_AsideItem.module.scss";
import { NavLink } from "react-router-dom";
const AsideItem = ({ name, icon, url, handleClick, isActive }) => {
  const onLinkClick = (e) => {
    handleClick(e.target.textContent);
  };
  return (
    <NavLink
      to={url}
      className={
        isActive === name ? `${styles.item} ${styles.active}` : styles.item
      }
      onClick={onLinkClick}
    >
      <span>{name}</span>
      <div className={styles.icon}>{icon}</div>
    </NavLink>
  );
};

export default AsideItem;
