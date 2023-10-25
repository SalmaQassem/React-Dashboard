import styles from "../styles/_Root.module.scss";
import Overlay from "../components/UI/Overlay";
import NavBar from "../components/NavBar/NavBar";
import Aside from "../components/Aside/Aside";
import { Outlet } from "react-router-dom";
import AsideContext from "../store/aside-context";
import { useContext } from "react";

const Root = () => {
  const context = useContext(AsideContext);
  return (
    <div className={styles.root}>
      <Overlay
        itemClass={
          context.isOpened
            ? `${styles.rootOverlay}`
            : `${styles.rootOverlay} ${styles.close}`
        }
      />
      <NavBar />
      <div className={styles.content}>
        <Aside />
        <div className={styles.body}>{<Outlet />}</div>
      </div>
    </div>
  );
};

export default Root;
