import styles from "../styles/_Root.module.scss";
import Overlay from "../components/UI/Overlay";
import NavBar from "../components/NavBar/NavBar";
import Aside from "../components/Aside/Aside";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className={styles.root}>
      <Overlay />
      <NavBar />
      <div className={styles.content}>
        <Aside />
        <div className={styles.body}>{<Outlet />}</div>
      </div>
    </div>
  );
};

export default Root;
