import styles from "../styles/_NewUser.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import { FiUserPlus } from "react-icons/fi";
import NewUserForm from "../components/NewUser/NewUserForm";
import { getAuthToken } from "../util/auth";
import { useTranslation } from "react-i18next";
import axios from "axios";

const NewUser = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className={styles.addUser}>
      <StyledHeader
        text={t("body.newUser")}
        icon={<FiUserPlus />}
        class={styles.header}
      />
      <NewUserForm />
    </div>
  );
};

export default NewUser;

export async function action({ request }) {
  const data = await request.formData();
  let img = sessionStorage.getItem("image");
  console.log(img);
  const userToken = getAuthToken();
  const formData = new FormData();
  formData.append("first_name", data.get("firstName"));
  formData.append("last_name", data.get("lastName"));
  formData.append("email", data.get("email"));
  formData.append("password", data.get("password"));
  formData.append("phone", data.get("phone"));
  formData.append("role", data.get("input1"));
  formData.append("image", img);
  let response = "";
  await axios
    .post("https://zadapp.mqawilk.com/api/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  /*try {
    response = await fetch("https://zadapp.mqawilk.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": " application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(enteredData),
    });
  } catch (error) {
    console.log(error.message);
  }*/

  return response;
}
