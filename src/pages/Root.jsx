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
import { getAuthToken } from "../util/auth";
import { redirect } from "react-router-dom";

const Root = () => {
  const context = useContext(AsideContext);
  const screenContext = useContext(FullScreenContext);
  const mainMode = useContext(ModeContext);
  const modeType = mainMode.mode === "dark" ? styles.dark : "";

  return (
    <FullScreen handle={screenContext.handle}>
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
          <div className={`${styles.content} ${modeType}`}>
            <Aside />
            <div className={styles.body}>{<Outlet />}</div>
          </div>
        </div>
      </div>
    </FullScreen>
  );
};

export default Root;
// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/");
  } else return "";
};
