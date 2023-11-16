import styles from "../styles/_Root.module.scss";
import Overlay from "../components/UI/Overlay";
import NavBar from "../components/NavBar/NavBar";
import Aside from "../components/Aside/Aside";
import { Outlet } from "react-router-dom";
import AsideContext from "../store/aside-context";
import { useContext } from "react";
import { FullScreen } from "react-full-screen";
import FullScreenContext from "../store/fullScreen-context";
import ModeContext from "../store/mode-context";

const Root = () => {
  const context = useContext(AsideContext);
  const screenContext = useContext(FullScreenContext);
  const mainMode = useContext(ModeContext);
  const modeType = mainMode.mode === "dark" ? styles.dark : "";

  return (
    <FullScreen
      handle={screenContext.handle}
    >
      <div className={styles.wrapper}>
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
            <div className={`${styles.body} ${modeType}`}>{<Outlet />}</div>
          </div>
        </div>
      </div>
    </FullScreen>
  );
};

export default Root;
