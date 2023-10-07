import styles from "../styles/_Authentication.module.scss";
import AuthForm from "../components/Auth/AuthForm";

const Authentication = () => {
  return (
    <div className={styles.auth}>
      <AuthForm />
    </div>
  );
};

export default Authentication;
