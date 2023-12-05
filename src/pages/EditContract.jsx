import styles from "../styles/_Contract.module.scss";
import { getAuthToken } from "../util/auth";
import { useLoaderData } from "react-router-dom";
import ContractFormHead from "../components/AddBuilding/ContractFormHead";
import ContractForm from "../components/AddBuilding/ContractForm";
import image from "../assets/images/Frame.png";
import { useTranslation } from "react-i18next";

const EditContract = () => {
  const data = useLoaderData();
  const [t, i18n] = useTranslation("global");

  return (
    <div className={styles.contract}>
      <ContractFormHead />
      <div className={styles.body}>
        <div className={styles.image}>
          <img src={image} alt="frame" />
        </div>
        <ContractForm
          inputsData={data}
          state="edit"
          message={t("body.editContractSuccess")}
          url={`https://zadapp.mqawilk.com/api/document/update/${data.id}`}
        />
      </div>
    </div>
  );
};

export default EditContract;
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const contractId = params.contractId;
  const token = getAuthToken();
  let response = "";
  try {
    response = await fetch(
      "https://zad.mqawilk.com/api/document/show/" + contractId,
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
