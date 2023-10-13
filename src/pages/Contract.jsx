import styles from "../styles/_Contract.module.scss";
import StyledContainer from "../components/UI/StyledContainer";
import logo from "../assets/images/logo.png";
import image from "../assets/images/Frame.png";
//import vector from "../assets/images/Vector2.png";
import ContractForm from "../components/AddBuilding/ContractForm";

const Contract = () => {
  return (
    <>
      <StyledContainer>
        <div className={styles.contract}>
          <div className={styles.head}>
            <h1>نموذج تعاقد</h1>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.image}>
              <img src={image} alt="frame" />
            </div>
            <ContractForm />
          </div>
        </div>
      </StyledContainer>
      {/*<img src={vector} alt="vector" className={styles.vector}/>*/}
    </>
  );
};

export default Contract;

export async function action({ request }) {
  const formData = await request.formData();
  const enteredData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  /*let response;
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
  return response;*/
  return "";
}
