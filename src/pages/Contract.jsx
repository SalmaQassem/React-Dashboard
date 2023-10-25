import styles from "../styles/_Contract.module.scss";
import StyledContainer from "../components/UI/StyledContainer";
import image from "../assets/images/Frame.png";
//import vector from "../assets/images/Vector2.png";
import ContractForm from "../components/AddBuilding/ContractForm";
import { getAuthToken } from "../util/auth";
import ContractFormHead from "../components/AddBuilding/ContractFormHead";
import { useTranslation } from "react-i18next";

const Contract = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <>
      <StyledContainer>
        <div className={styles.contract}>
          <ContractFormHead />
          <div className={styles.body}>
            <div className={styles.image}>
              <img src={image} alt="frame" />
            </div>
            <ContractForm state="add" message={t("body.contractSuccess")} />
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
  const offset = new Date().getTimezoneOffset();

  const startDate = new Date(
    Date.parse(formData.get("startDate")) - offset * 60 * 1000
  )
    .toISOString()
    .replace("T", " ")
    .split(".")[0];

  const endDate = new Date(
    Date.parse(formData.get("endDate")) - offset * 60 * 1000
  )
    .toISOString()
    .replace("T", " ")
    .split(".")[0];
  const documentStart = new Date(
    Date.parse(formData.get("contractDate")) - offset * 60 * 1000
  )
    .toISOString()
    .replace("T", " ")
    .split(".")[0];

  const enteredData = {
    user_id: sessionStorage.getItem("userId"),
    house_id: sessionStorage.getItem("houseId"),
    price_hajj: formData.get("hajjPrice"),
    start_date: startDate,
    end_date: endDate,
    document_start: documentStart,
    notes: formData.get("notes"),
  };
  //console.log(enteredData);
  const userToken = getAuthToken();
  let response;
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/document/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(enteredData),
    });
  } catch (error) {
    console.log(error.message);
  }
  return response;
}
