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

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const enteredData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  let response = "";
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredData),
    });
  } catch (error) {
    console.log(error.message);
  }
  return response;
}
