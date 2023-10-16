import styles from "../../styles/_ContractFormHead.module.scss";
import logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";

const ContractFormHead = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className={styles.head}>
      <h1>{t("body.contractForm")}</h1>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default ContractFormHead;
