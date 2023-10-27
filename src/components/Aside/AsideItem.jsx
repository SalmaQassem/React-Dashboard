import styles from "../../styles/_AsideItem.module.scss";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import ModeContext from "../../store/mode-context";

const AsideItem = (props) => {
  const mainMode = useContext(ModeContext);
  const modeType = mainMode.mode === "dark" ? styles.dark : "";
  const clickHandler = () => {
    props.onClick();
  };
  return (
    <div className={styles.link} onClick={clickHandler}>
      <NavLink
        to={props.url}
        className={({ isActive }) =>
          isActive
            ? `${styles.item} ${styles.active} ${modeType}`
            : `${styles.item} ${modeType}`
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
