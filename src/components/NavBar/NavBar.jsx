import styles from "../../styles/_NavBar.module.scss";
//import StyledContainer from "../UI/StyledContainer";
import logo from "../../assets/images/logo.png";
import { useContext, useState } from "react";
import AsideContext from "../../store/aside-context";
import ModeContext from "../../store/mode-context";
import Search from "./Search";
import Tools from "./Tools";
import UserInfo from "./UserInfo";
import DropBox from "./DropBox";
import { AnimatePresence } from "framer-motion";
import { LiaUserCircleSolid } from "react-icons/lia";

const NavBar = () => {
  const [isShown, setIsShown] = useState(false);
  const asideContext = useContext(AsideContext);
  const modeContext = useContext(ModeContext);
  const modeType = modeContext.mode === "dark" ? styles.dark : "";
  const onBarsClick = () => {
    asideContext.setIsOpened();
  };
  const onHoverHandler = () => {
    setIsShown(true);
  };
  const onBlurHandler = () => {
    setIsShown(false);
  };
  const onClickHandler = (e) => {
    e.stopPropagation();
    setIsShown(() => {
      if (isShown === false) return true;
      else if (isShown === true) return false;
    });
  };
  const onAction = () => {
    setIsShown(false);
  };
  return (
    <nav className={`${styles.nav} ${modeType}`}>
      <div className={styles.items}>
        <div className={styles.title}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={styles.bars} onClick={onBarsClick}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <Search />
        <Tools />
        <div
          className={styles.userInfo}
          onMouseEnter={onHoverHandler}
          onMouseLeave={onBlurHandler}
          onClick={onClickHandler}
        >
          <UserInfo />
          <div className={styles.userIcon}>
            <LiaUserCircleSolid />
          </div>
          <AnimatePresence>
            {isShown && <DropBox setShown={onAction} />}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
