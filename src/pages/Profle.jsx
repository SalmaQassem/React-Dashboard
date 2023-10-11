import styles from "../styles/_Profile.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import ProfileForm from "../components/Profile/ProfileForm";
import { FaRegUserCircle } from "react-icons/fa";

const Profile = () => {
  return (
    <div className={styles.profile}>
      <StyledHeader
        text="حسابي"
        icon={<FaRegUserCircle />}
        class={styles.header}
      />
      <ProfileForm />
    </div>
  );
};

export default Profile;
