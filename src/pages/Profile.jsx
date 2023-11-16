import styles from "../styles/_Profile.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import ProfileForm from "../components/Profile/ProfileForm";
import { FaRegUserCircle } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const [t, i18n] = useTranslation("global");
  const data = useLoaderData();

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

// eslint-disable-next-line react-refresh/only-export-components
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
