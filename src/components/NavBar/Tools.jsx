import styles from "../../styles/_Tools.module.scss";
import { useState, useContext } from "react";
import Overlay from "../UI/Overlay";
import { TfiWorld } from "react-icons/tfi";
import { HiArrowsPointingOut, HiOutlineBellAlert } from "react-icons/hi2";
import { FiSettings, FiSun } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import UserContext from "../../store/user-context";
import FullScreenContext from "../../store/fullScreen-context";
import ModeContext from "../../store/mode-context";

const Tools = () => {
  const [t, i18n] = useTranslation("global");
  const [isIconsShown, setIsIconsShown] = useState(false);
  const context = useContext(UserContext);
  const screenContext = useContext(FullScreenContext);
  const modeContext = useContext(ModeContext);
  const modeType = modeContext.mode === "dark" ? styles.dark : "";

  const changeLanguage = () => {
    if (i18n.language === "ar") {
      i18n.changeLanguage("en");
      sessionStorage.setItem("lang", "en");
    } else {
      i18n.changeLanguage("ar");
      sessionStorage.setItem("lang", "ar");
    }
    if (isIconsShown) {
      setIsIconsShown(false);
    }
  };
  const handleMode = () => {
    modeContext.setMode();
    if (isIconsShown) {
      setIsIconsShown(false);
    }
  };
  const handleResize = () => {
    screenContext.handle.enter();
    if (isIconsShown) {
      setIsIconsShown(false);
    }
  };
  const handleIcons = () => {
    setIsIconsShown((prev) => {
      return !prev;
    });
  };
  const handleNavigate = () => {
    if (isIconsShown) {
      setIsIconsShown(false);
    }
  };
  const links = [
    {
      id: "0",
      icon: <TfiWorld />,
      event: changeLanguage,
      text: t("body.changeLanguage"),
    },
    {
      id: "1",
      icon: <HiArrowsPointingOut />,
      event: handleResize,
      text: t("body.resize"),
    },
    { id: "2", icon: <FiSun />, event: handleMode, text: t("body.darkLight") },
    {
      id: "3",
      icon: <HiOutlineBellAlert />,
      event: handleNavigate,
      text: t("body.notifications"),
    },
  ];
  const x_value = i18n.language === "en" ? "-1rem" : "1rem";

  const childVariants = {
    hidden: { opacity: 0, x: x_value },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <>
      <button
        className={
          i18n.language === "en"
            ? `${styles.settings} ${styles.en}`
            : styles.settings
        }
        onClick={handleIcons}
      >
        <FiSettings />
      </button>
      {isIconsShown && <Overlay />}
      <AnimatePresence>
        {isIconsShown && (
          <motion.div
            className={
              i18n.language === "en"
                ? `${styles.collapseIcons} ${styles.en}`
                : styles.collapseIcons
            }
            initial="hidden"
            animate="visible"
            variants={childVariants}
            exit={{ opacity: 0, x: "1rem" }}
            transition={{ staggerChildren: 0.1, ease: "easeInOut" }}
          >
            {links.map((item, index) => {
              if (index === 3) {
                return (
                  context.role === "super_admin" && (
                    <motion.div
                      key={item.id}
                      variants={childVariants}
                      exit={{ opacity: 0, x: "1rem" }}
                      transition={{ ease: "easeInOut" }}
                    >
                      <Link
                        to="Notifications"
                        className={`${styles.icon} ${modeType}`}
                        onClick={item.event}
                      >
                        {item.icon}
                        <span>{item.text}</span>
                      </Link>
                    </motion.div>
                  )
                );
              } else {
                return (
                  <motion.div
                    key={item.id}
                    className={`${styles.icon} ${modeType}`}
                    variants={childVariants}
                    exit={{ opacity: 0, x: "1rem" }}
                    transition={{ ease: "easeInOut" }}
                    onClick={item.event}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </motion.div>
                );
              }
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.icons}>
        {links.map((item, index) => {
          if (index === 3) {
            return (
              context.role === "super_admin" && (
                <div key={item.id}>
                  <Link
                    to="Notifications"
                    className={`${styles.icon} ${modeType}`}
                  >
                    {item.icon}
                  </Link>
                </div>
              )
            );
          } else {
            return (
              <div
                key={item.id}
                className={`${styles.icon} ${modeType}`}
                onClick={item.event}
              >
                {item.icon}
              </div>
            );
          }
        })}
      </div>
    </>
  );
};
export default Tools;
