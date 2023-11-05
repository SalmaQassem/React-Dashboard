import styles from "../../styles/_ThirdPage.module.scss";
import Map from "./Map";
import FormButton from "../UI/FormButton";
import { useContext } from "react";
import BuildingContext from "../../store/building-context";
import UserContext from "../../store/user-context";
import { LiaHotelSolid } from "react-icons/lia";
import { getAuthToken } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ThirdPage = (props) => {
  const [t, i18n] = useTranslation("global");
  const context = useContext(BuildingContext);
  const userData = useContext(UserContext);
  const navigate = useNavigate();

  const sendData = async (data) => {
    const userToken = getAuthToken();
    try {
      const response = await axios.post(props.url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const res = response.data;
      if (props.state === "edit") {
        alert("success");
        navigate("/dashboard");
      } else {
        sessionStorage.setItem("houseId", res.id);
        sessionStorage.setItem("userId", res.user_id);
        navigate("/dashboard/Review");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const saveData = async () => {
    const formData = new FormData();
    formData.append("user_id", userData.id);
    for (let key of Object.keys(context)) {
      if (
        key !== "setFormData" &&
        key !== "setPage" &&
        key !== "page" &&
        key !== "id"
      ) {
        if (key === "media") {
          for (let i = 0; i < context[key].length; i++) {
            formData.append("media[]", context[key][i]);
          }
        } else {
          formData.append(key, context[key]);
        }
      }
    }
    sendData(formData);
  };

  return (
    <div className={styles.map}>
      <p>{t("body.showOnMap")}</p>
      <div className={styles.mapItem}>
        <Map />
      </div>
      <FormButton
        class={styles.save}
        type="button"
        icon={<LiaHotelSolid />}
        onClick={saveData}
      >
        {t("body.saveRegistration")}
      </FormButton>
    </div>
  );
};

export default ThirdPage;
