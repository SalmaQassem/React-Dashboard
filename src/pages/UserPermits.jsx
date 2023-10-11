import styles from "../styles/_UserPermits.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import { FaUserShield } from "react-icons/fa";
import UserPermitsForm from "../components/UserPermits/UserPermitsForm";
import { useState } from "react";
const adminPermits = [
  { id: "0", name: "حذف مستخدم" },
  { id: "1", name: "إضافة مستخدم" },
  { id: "2", name: "تعديل حساب" },
];
const clientPermits = [
  { id: "0", name: "طلب تعديل محتوى" },
  { id: "1", name: "طلب تعديل حساب" },
  { id: "2", name: "طلب حذف محتوى" },
];
const UserPermits = () => {
  const [input, setInput] = useState("");
  const radioInputHandler = ({ target: { value } }) => {
    setInput(value);
  };
  return (
    <div className={styles.userPermits}>
      <StyledHeader
        text="صلاحيات المستخدمين"
        icon={<FaUserShield />}
        class={styles.header}
      ></StyledHeader>
      <div className={styles.forms}>
        <UserPermitsForm
          type="أدمن"
          permits={adminPermits}
          inputHandler={radioInputHandler}
        />
        <UserPermitsForm
          type="فرد أو شركة"
          permits={clientPermits}
          inputHandler={radioInputHandler}
        />
      </div>
    </div>
  );
};

export default UserPermits;
