import styles from "../../styles/_ChangeLanguage.module.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ChangeLanguage = () => {
  const [active, setActive] = useState("ar");
  const [t, i18n] = useTranslation("global");
  
  const changeLanguage = () => {
    if (i18n.language === "ar") {
      i18n.changeLanguage("en");
      setActive("en");
      sessionStorage.setItem("lang", "en");
    } else {
      i18n.changeLanguage("ar");
      setActive("ar");
      sessionStorage.setItem("lang", "ar");
    }
  };
  return (
    <div className={styles.languages}>
      <button
        type="text"
        className={active === "ar" ? styles.active : ""}
        onClick={changeLanguage}
      >
        العربية
      </button>
      <button
        type="text"
        className={active === "en" ? styles.active : ""}
        onClick={changeLanguage}
      >
        english
      </button>
    </div>
  );
};
export default ChangeLanguage;
