import styles from "../../styles/_Aside.module.scss";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import AsideItem from "./AsideItem";
const main = [
  { id: "0", name: "لوحة التحكم", icon: <MdOutlineDashboardCustomize /> },
  { id: "1", name: "رسالة", icon: <IoIosChatbubbles /> },
];
const usersOptions = [
  { id: "0", name: "مستخدم جديد", icon: <FiUserPlus /> },
  { id: "1", name: "صلاحيات المستخدم", icon: <FiUserCheck /> },
];
const account = [{ name: "حسابي", icon: <FaRegUserCircle /> }];

const Aside = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.section}>
        <div className={styles.items}>
          {main.map((item) => {
            return (
              <AsideItem key={item.id} name={item.name} icon={item.icon} />
            );
          })}
        </div>
      </div>
      <div className={styles.section}>
        <span>إدارة المستخدمين</span>
        <div className={styles.items}>
          {usersOptions.map((item) => {
            return (
              <AsideItem key={item.id} name={item.name} icon={item.icon} />
            );
          })}
        </div>
      </div>
      <div className={styles.section}>
        <span>إدارة الحساب</span>
        <div className={styles.items}>
          {account.map((item) => {
            return (
              <AsideItem key={item.id} name={item.name} icon={item.icon} />
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
