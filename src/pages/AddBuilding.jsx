import styles from "../styles/_AddBuilding.module.scss";
import MainHeader from "../components/UI/MainHeader";
import AddBuildingForm from "../components/AddBuilding/AddBuildingForm";
import { LiaHotelSolid } from "react-icons/lia";
import StyledContainer from "../components/UI/StyledContainer";
import { useTranslation } from "react-i18next";

const AddBuilding = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className={styles.page}>
      <div className={styles.body}>
        <MainHeader text={t("body.addBuilding")} icon={<LiaHotelSolid />} />
        <AddBuildingForm state="add" />
      </div>
    </div>
  );
};

export default AddBuilding;
