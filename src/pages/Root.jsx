import styles from "../styles/_Root.module.scss";
import NavBar from "../components/NavBar/NavBar";
import Aside from "../components/Aside/Aside";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className={styles.root}>
      <NavBar />
      <div className={styles.content}>
        <Aside />
        <div className={styles.body}>{<Outlet />}</div>
      </div>
    </div>
  );
};

export default Root;
