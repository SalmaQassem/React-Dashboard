import styles from "../styles/_NewUser.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import { FiUserPlus } from "react-icons/fi";
import NewUserForm from "../components/NewUser/NewUserForm";
import { getAuthToken } from "../util/auth";
import { useTranslation } from "react-i18next";

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
  const formData = await request.formData();
  const userToken = getAuthToken();
  const enteredData = {
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    role: formData.get("input1"),
  };
  let response;
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/register", {
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
