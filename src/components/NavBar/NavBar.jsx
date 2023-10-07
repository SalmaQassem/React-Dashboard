import styles from "../../styles/_NavBar.module.scss";
import StyledContainer from "../UI/StyledContainer";
import logo from "../../assets/images/logo.png";
import { HiOutlineSearch } from "react-icons/hi";
import { TfiWorld } from "react-icons/tfi";
import {
  HiArrowsPointingOut,
  HiOutlineSun,
  HiOutlineBellAlert,
} from "react-icons/hi2";
import user from "../../assets/images/Ellipse 7.png";
const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <StyledContainer>
        <div className={styles.items}>
          <div className={styles.title}>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
            </div>
            <div className={styles.bars}>
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className={styles.search}>
            <div className={styles.input}>
              <input placeholder="بحث" />
              <div className={styles.searchIcon}>
                <HiOutlineSearch />
              </div>
            </div>
          </div>
          <div className={styles.tools}>
            <div className={styles.icons}>
              <div className={`${styles.icon} ${styles.language}`}>
                <TfiWorld />
              </div>
              <div className={`${styles.icon} ${styles.resize}`}>
                <HiArrowsPointingOut />
              </div>
              <div className={`${styles.icon} ${styles.mode}`}>
                <HiOutlineSun />
              </div>
              <div className={`${styles.icon} ${styles.notification}`}>
                <HiOutlineBellAlert />
              </div>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.user}>
                <img src={user} alt="user" />
              </div>
              <div className={styles.text}>
                <p>أحمد منتصر</p>
                <p>مدخل بيانات</p>
              </div>
            </div>
          </div>
        </div>
      </StyledContainer>
    </nav>
  );
};

export default NavBar;
