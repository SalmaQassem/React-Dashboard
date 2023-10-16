import styles from "../styles/_EditContract.module.scss";
import { getAuthToken } from "../util/auth";
import { useLoaderData } from "react-router-dom";
import StyledContainer from "../components/UI/StyledContainer";
import ContractFormHead from "../components/AddBuilding/ContractFormHead";
import ContractForm from "../components/AddBuilding/ContractForm";
import image from "../assets/images/Frame.png";

let houseId = "";
const EditContract = () => {
  const data = useLoaderData();
  houseId = data.id;
  return (
    <StyledContainer>
      <div className={styles.contract}>
        <ContractFormHead />
        <div className={styles.body}>
          <div className={styles.image}>
            <img src={image} alt="frame" />
          </div>
          <ContractForm inputsData={data} />
        </div>
      </div>
    </StyledContainer>
  );
};

export default EditContract;

export async function loader({ request, params }) {
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
    price_hajj: formData.get("hajjPrice"),
    start_date: startDate,
    end_date: endDate,
    document_start: documentStart,
    notes: formData.get("notes"),
  };
  console.log(enteredData);
  const userToken = getAuthToken();
  let response;
  try {
    response = await fetch(
      "https://zadapp.mqawilk.com/api/document/update/" + houseId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(enteredData),
      }
    );
  } catch (error) {
    console.log(error.message);
  }
  return response;
}
