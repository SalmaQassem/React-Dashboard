import styles from "../../styles/_UserInfo.module.scss";
import UserContext from "../../store/user-context";
import ModeContext from "../../store/mode-context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const UserInfo = ({ extraClass }) => {
  const context = useContext(UserContext);
  const modeContext = useContext(ModeContext);
  const modeType = modeContext.mode === "dark" ? styles.dark : "";
  const [t, i18n] = useTranslation("global");

  return (
    <div className={extraClass ? `${styles.info} ${extraClass}` : styles.info}>
      <div className={styles.user}>
        <img
          src={`https://zadapp.mqawilk.com/public/images/${context.image}`}
          alt="user"
        />
      </div>
      <div className={`${styles.text} ${modeType}`}>
        <p>{`${context.first_name} ${context.last_name}`}</p>
        <p>
          {context.role === "super_admin"
            ? t("body.adminRole")
            : t("body.writer")}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
