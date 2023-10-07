import styles from "../styles/_Authentication.module.scss";
import StyledContainer from "../components/UI/StyledContainer";
import AuthForm from "../components/Auth/AuthForm";
import login from "../assets/images/Frame.png";

const Authentication = () => {
  return (
    <div className={styles.auth}>
      <StyledContainer>
        <div className={styles.content}>
          <AuthForm />
          <div className={styles.image}>
            <img src={login} alt="login" />
          </div>
        </div>
      </StyledContainer>
    </div>
  );
};

export default Authentication;
