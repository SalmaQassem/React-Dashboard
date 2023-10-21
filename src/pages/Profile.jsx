import styles from "../styles/_Profile.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import ProfileForm from "../components/Profile/ProfileForm";
import { FaRegUserCircle } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { useTranslation } from "react-i18next";
let password = "";

const Profile = () => {
  const [t, i18n] = useTranslation("global");
  const data = useLoaderData();
  password = data[0]["password"];
  return (
    <div className={styles.profile}>
      <StyledHeader
        text={t("body.profile")}
        icon={<FaRegUserCircle />}
        class={styles.header}
      />
      <ProfileForm userData={data[0]} />
    </div>
  );
};

export default Profile;

export async function action({ request }) {
  const formData = await request.formData();
  const pass =
    formData.get("password").trim() === ""
      ? password
      : formData.get("password");
  const enteredData = {
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    phone: +formData.get("phone"),
    password: pass,
  };
  const userToken = getAuthToken();
  let response = "";
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/profile/update", {
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

export async function loader() {
  let response = "";
  const token = getAuthToken();
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error.message);
  }

  return response;
}
