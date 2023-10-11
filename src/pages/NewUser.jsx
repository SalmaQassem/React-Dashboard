import styles from "../styles/_NewUser.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import { FiUserPlus } from "react-icons/fi";
import NewUserForm from "../components/NewUser/NewUserForm";

const NewUser = () => {
  return (
    <div className={styles.addUser}>
      <StyledHeader
        text="إضافة مستخدم جديد"
        icon={<FiUserPlus />}
        class={styles.header}
      />
      <NewUserForm />
    </div>
  );
};

export default NewUser;
