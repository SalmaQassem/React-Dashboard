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
import user from "../../assets/images/Ellipse.png";
import { useContext, useRef } from "react";
import AsideContext from "../../store/aside-context";
import UserContext from "../../store/user-context";
import { useTranslation } from "react-i18next";
import { getAuthToken } from "../../util/auth";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [t, i18n] = useTranslation("global");
  const asideContext = useContext(AsideContext);
  const context = useContext(UserContext);
  const searchRef = useRef();
  const navigate = useNavigate();
  const onBarsClick = () => {
    asideContext.setIsOpened();
  };
  const changeLanguage = () => {
    if (i18n.language === "ar") {
      i18n.changeLanguage("en");
      sessionStorage.setItem("lang", "en");
    } else {
      i18n.changeLanguage("ar");
      sessionStorage.setItem("lang", "ar");
    }
  };
  const searchHandler = async () => {
    if (searchRef.current.value.trim() !== "") {
      const enteredData = searchRef.current.value.trim();
      const token = getAuthToken();
      let response;
      try {
        response = await fetch("https://zadapp.mqawilk.com/api/house/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(enteredData),
        });
        const data = await response.json();
        const id = data.id;
        navigate(`Houses/${id}`);
        searchRef.current.value = "";
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <nav className={styles.nav}>
      <StyledContainer>
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
          <div className={styles.search}>
            <div className={styles.input}>
              <input placeholder={t("body.search")} ref={searchRef} />
              <div className={styles.searchIcon} onClick={searchHandler}>
                <HiOutlineSearch />
              </div>
            </div>
          </div>
          <div className={styles.tools}>
            <div className={styles.icons}>
              <div
                className={`${styles.icon} ${styles.language}`}
                onClick={changeLanguage}
              >
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
                <p>{`${context.first_name} ${context.last_name}`}</p>
                <p>
                  {context.role === "super_admin"
                    ? t("body.adminRole")
                    : t("body.writer")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </StyledContainer>
    </nav>
  );
};

export default NavBar;
