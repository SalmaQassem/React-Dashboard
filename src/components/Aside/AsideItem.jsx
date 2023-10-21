import styles from "../../styles/_AsideItem.module.scss";
import { NavLink } from "react-router-dom";
const AsideItem = (props) => {
  const clickHandler = () => {
    props.onClick();
  };
  return (
    <div className={styles.link} onClick={clickHandler}>
      <NavLink
        to={props.url}
        className={({ isActive }) =>
          isActive ? `${styles.item} ${styles.active}` : styles.item
        }
        end={props.End}
      >
        <span>{props.name}</span>
        <div className={styles.icon}>{props.icon}</div>
      </NavLink>
    </div>
  );
};

export default AsideItem;
