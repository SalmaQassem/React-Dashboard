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

const ThirdPage = () => {
  const [t, i18n] = useTranslation("global");
  const context = useContext(BuildingContext);
  //console.log(context);
  const userData = useContext(UserContext);
  const navigate = useNavigate();

  const sendData = async (data) => {
    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log()
    const userToken = getAuthToken();
    try {
      let response = await fetch(
        "https://zadapp.mqawilk.com/api/houses/store",
        {
          method: "POST",
          headers: {
            //"Content-type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
          body: data,
        }
      );
      const res = await response.json();
      sessionStorage.setItem("houseId", res.id);
      navigate("/dashboard/Review");
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveData = async () => {
    const formData = new FormData();
    formData.append("user_id", userData.id);
    formData.append("house_name", context.house_name);
    formData.append("type", context.type);
    formData.append("total_room", context.total_room);
    formData.append("street", context.total_room);
    formData.append("hajjaj_accsept", context.hajjaj_accsept);
    formData.append("hajjaj_count", context.hajjaj_count);
    formData.append("number_prrmit", +context.number_prrmit);
    formData.append("house_owner_name", context.house_owner_name);
    formData.append("phone", context.phone);
    formData.append("build_number_prrmit", context.build_number_prrmit);
    formData.append("total_floor", context.total_floor);
    formData.append("owner_ip", context.owner_ip);
    formData.append("lessor_name", context.lessor_name);
    formData.append("alarm_network", context.alarm_network);
    formData.append("fire_network", context.fire_network);
    formData.append("fire_pump", context.fire_pump);
    formData.append("generator", context.generator);
    formData.append("bilud_component", context.bilud_component);
    formData.append("institution_maintenance", context.institution_maintenance);
    formData.append("institution_safty", context.institution_safty);
    formData.append("price_hajj", context.price_hajj);
    formData.append("price_years", context.price_years);
    context.media.map((item) => {
      return formData.append("media", item);
    });
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
