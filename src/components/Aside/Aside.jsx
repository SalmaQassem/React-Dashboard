import styles from "../../styles/_Aside.module.scss";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaHotelSolid } from "react-icons/lia";
import AsideItem from "./AsideItem";
import { useContext, useState } from "react";
import AsideContext from "../../store/aside-context";
import UserContext from "../../store/user-context";
import { useTranslation } from "react-i18next";

const Aside = () => {
  const [t, i18n] = useTranslation("global");
  const asideContext = useContext(AsideContext);
  const context = useContext(UserContext);
  const [isActive, setIsActive] = useState("");
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

  const clickHandler = (text) => {
    setIsActive(text);
  };
  return (
    <aside
      className={
        asideContext.isOpened ? styles.aside : `${styles.aside} ${styles.close}`
      }
    >
      <div className={styles.section}>
        <div className={styles.items}>
          {main.map((item) => {
            return (
              <AsideItem
                key={item.id}
                name={item.name}
                icon={item.icon}
                url={item.url}
                isActive={isActive}
                handleClick={clickHandler}
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
                  isActive={isActive}
                  handleClick={clickHandler}
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
                isActive={isActive}
                handleClick={clickHandler}
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
                isActive={isActive}
                handleClick={clickHandler}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
