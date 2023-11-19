import styles from "../../styles/_Aside.module.scss";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaHotelSolid } from "react-icons/lia";
import { AiOutlineFileDone } from "react-icons/ai";
import { PiFiles } from "react-icons/pi";
import { FaKaaba } from "react-icons/fa6";
import AsideItem from "./AsideItem";
import { useContext } from "react";
import AsideContext from "../../store/aside-context";
import UserContext from "../../store/user-context";
import { useTranslation } from "react-i18next";
import ModeContext from "../../store/mode-context";

const Aside = () => {
  const [t, i18n] = useTranslation("global");
  const asideContext = useContext(AsideContext);
  const context = useContext(UserContext);
  const mainMode = useContext(ModeContext);
  const main = [
    {
      id: "0",
      name: t("body.dashboard"),
      icon: <MdOutlineDashboardCustomize />,
      url: "",
    },
    {
      id: "1",
      name: t("body.messages"),
      icon: <IoIosChatbubbles />,
      url: "Messages",
    },
  ];
  const usersOptions = [
    { id: "0", name: t("body.newUser"), icon: <FiUserPlus />, url: "NewUser" },
    {
      id: "1",
      name: t("body.permissions"),
      icon: <FiUserCheck />,
      url: "UserPermits",
    },
    {
      id: "2",
      name: t("body.contracts"),
      icon: <AiOutlineFileDone />,
      url: "Contracts",
    },
    {
      id: "3",
      name: t("body.reports"),
      icon: <PiFiles />,
      url: "Reports",
    },
    {
      id: "4",
      name: t("body.completeHejj"),
      icon: <FaKaaba />,
      url: "Close-Season",
    },
  ];
  const houses = [
    {
      id: "0",
      name: t("body.addBuilding"),
      icon: <LiaHotelSolid />,
      url: "AddBuilding",
    },
  ];
  const account = [
    {
      id: "0",
      name: t("body.profile"),
      icon: <FaRegUserCircle />,
      url: "Profile",
    },
  ];
  const clickLinkHandler = () => {
    if (asideContext.isOpened) {
      asideContext.setIsOpened(false);
    }
  };
  const modeType = mainMode.mode === "dark" ? styles.dark : "";
  return (
    <aside
      className={
        asideContext.isOpened
          ? `${styles.aside} ${modeType}`
          : `${styles.aside} ${styles.close} ${modeType}`
      }
    >
      <div className={styles.section}>
        <div className={styles.items}>
          {main.map((item, index) => {
            return index === 0 ? (
              <AsideItem
                key={item.id}
                name={item.name}
                icon={item.icon}
                url={item.url}
                End={true}
                onClick={clickLinkHandler}
              />
            ) : (
              <AsideItem
                key={item.id}
                name={item.name}
                icon={item.icon}
                url={item.url}
                End={false}
                onClick={clickLinkHandler}
              />
            );
          })}
        </div>
      </div>
      {context.role === "super_admin" && (
        <div className={styles.section}>
          <span>{t("body.usersControl")}</span>
          <div className={styles.items}>
            {usersOptions.map((item) => {
              return (
                <AsideItem
                  key={item.id}
                  name={item.name}
                  icon={item.icon}
                  url={item.url}
                  onClick={clickLinkHandler}
                />
              );
            })}
          </div>
        </div>
      )}
      <div className={styles.section}>
        <span>{t("body.buildingControl")}</span>
        <div className={styles.items}>
          {houses.map((item) => {
            return (
              <AsideItem
                key={item.id}
                name={item.name}
                icon={item.icon}
                url={item.url}
                onClick={clickLinkHandler}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.section}>
        <span>{t("body.account")}</span>
        <div className={styles.items}>
          {account.map((item) => {
            return (
              <AsideItem
                key={item.id}
                name={item.name}
                icon={item.icon}
                url={item.url}
                onClick={clickLinkHandler}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
