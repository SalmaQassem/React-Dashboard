import styles from "../styles/_NewUser.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import { FiUserPlus } from "react-icons/fi";
import NewUserForm from "../components/NewUser/NewUserForm";
import { useTranslation } from "react-i18next";

const NewUser = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className={styles.addUser}>
      <StyledHeader
        text={t("body.newUser")}
        icon={<FiUserPlus />}
        class={styles.header}
      />
      <NewUserForm />
    </div>
  );
};

export default NewUser;
