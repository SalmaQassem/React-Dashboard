import styles from "../styles/_Root.module.scss";
import NavBar from "../components/NavBar/NavBar";
import Aside from "../components/Aside/Aside";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import AsideContext from "../store/aside-context";

const Root = () => {
  const context = useContext(AsideContext);
  return (
    <div className={styles.root}>
      <NavBar />
      <div className={styles.content}>
        <Aside />
        <div className={context.isOpened ? styles.body : `${styles.body} ${styles.full}`}>
          {<Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Root;
