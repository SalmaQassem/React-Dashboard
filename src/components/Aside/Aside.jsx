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

const main = [
  {
    id: "0",
    name: "لوحة التحكم",
    icon: <MdOutlineDashboardCustomize />,
    url: "",
  },
  { id: "1", name: "رسالة", icon: <IoIosChatbubbles />, url: "/dashboard" },
];
const usersOptions = [
  { id: "0", name: "مستخدم جديد", icon: <FiUserPlus />, url: "NewUser" },
  {
    id: "1",
    name: "صلاحيات المستخدم",
    icon: <FiUserCheck />,
    url: "/dashboard",
  },
];
const account = [
  { id: "0", name: "حسابي", icon: <FaRegUserCircle />, url: "/dashboard" },
];
const houses = [
  { id: "0", name: "إضافة منشأة", icon: <LiaHotelSolid />, url: "AddBuilding" },
];

const Aside = () => {
  const asideContext = useContext(AsideContext);
  const context = useContext(UserContext);
  const [isActive, setIsActive] = useState("لوحة التحكم");
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
      <div className={styles.section}>
        <span>
          {context.role === "super_admin"
            ? "إدارة المستخدمين"
            : "إدارة المنشأه"}
        </span>
        <div className={styles.items}>
          {(context.role === "super_admin" ? usersOptions : houses).map(
            (item) => {
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
            }
          )}
        </div>
      </div>
      <div className={styles.section}>
        <span>إدارة الحساب</span>
        <div className={styles.items}>
          {account.map((item) => {
            return (
              <AsideItem
                key={item.id}
                name={item.name}
                icon={item.icon}
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
