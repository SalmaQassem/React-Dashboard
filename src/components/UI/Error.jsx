import { useTranslation } from "react-i18next";
import styles from "../../styles/_Error.module.scss";
import { Link } from "react-router-dom";

const Error = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className={styles.error}>
      <h1>404</h1>
      <p className={styles.firstMsg}>{t("body.pageNotFound")}</p>
      <p className={styles.secondMsg}>
        {`${t("body.pageNotFoundMesg")}. ${t("body.goTo")} `}
        <Link to="/dashboard">{`${t("body.homePage")}.`}</Link>
      </p>
    </div>
  );
};
export default Error;
