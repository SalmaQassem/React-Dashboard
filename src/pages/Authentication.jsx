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
  const data = await request.formData();
  const enteredData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  /*const response = await fetch("https://zad.mqawilk.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enteredData),
  });*/

  const res = {
    accessToken: "kkk",
    user: {
      id: "0",
      first_name: "أحمد",
      last_name: "منتصر",
      phone: 536,
      email: "test@gmail.com",
      role: "writer",
      created_at: "",
      updated_at: "",
    },
  };
  //const res = { message: "email or password invalid" };

  return res;
  //return response;
}
