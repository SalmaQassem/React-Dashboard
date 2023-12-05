import styles from "../styles/_Contract.module.scss";
import StyledContainer from "../components/UI/StyledContainer";
import image from "../assets/images/Frame.png";
import ContractForm from "../components/AddBuilding/ContractForm";
import ContractFormHead from "../components/AddBuilding/ContractFormHead";
import { useTranslation } from "react-i18next";
import { getAuthToken } from "../util/auth";
import { useLoaderData } from "react-router-dom";

const Contract = () => {
  const data = useLoaderData();
  const [t, i18n] = useTranslation("global");

  return (
    <StyledContainer>
      <div className={styles.contract}>
        <ContractFormHead />
        <div className={styles.body}>
          <div className={styles.image}>
            <img src={image} alt="frame" />
          </div>
          <ContractForm
            state="add"
            user_id={data[0].user_id}
            house_id={data[0].id}
            message={t("body.contractSuccess")}
            url="https://zadapp.mqawilk.com/api/document/store"
          />
        </div>
      </div>
    </StyledContainer>
  );
};
export default Contract;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const id = params.houseId;
  const token = getAuthToken();
  let response = "";
  try {
    response = await fetch(
      "https://zadapp.mqawilk.com/api/show/selfhoues/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error.message);
  }

  return response;
}
