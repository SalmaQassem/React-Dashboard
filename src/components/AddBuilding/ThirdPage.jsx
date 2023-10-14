import styles from "../../styles/_ThirdPage.module.scss";
import Map from "./Map";
import FormButton from "../UI/FormButton";
import { useContext } from "react";
import BuildingContext from "../../store/building-context";
import UserContext from "../../store/user-context";
import { LiaHotelSolid } from "react-icons/lia";
import { getAuthToken } from "../../util/auth";
import { useNavigate } from "react-router-dom";

const ThirdPage = () => {
  const context = useContext(BuildingContext);
  const userData = useContext(UserContext);
  const navigate = useNavigate();
  const saveData = async () => {
    const enteredData = {
      user_id: userData.id,
      house_name: context.house_name,
      type: context.type,
      total_room: context.total_room,
      street: context.street,
      hajjaj_accsept: context.hajjaj_accsept, //عدد الحجاج الفعلي
      hajjaj_count: context.hajjaj_count, //عدد الحجاج في التصريح
      number_prrmit: +context.number_prrmit, //رقم التصريح
      house_owner_name: context.house_owner_name,
      phone: context.phone,
      build_number_prrmit: context.build_number_prrmit, //رقم رخصة البناء
      total_floor: context.total_floor,
      owner_ip: context.owner_ip,
      lessor_name: context.lessor_name,
      alarm_network: context.alarm_network,
      fire_network: context.fire_network,
      fire_pump: context.fire_pump,
      generator: context.generator,
      bilud_component: context.bilud_component,
      institution_maintenance: context.institution_maintenance,
      institution_safty: context.institution_safty,
      price_hajj: context.price_hajj,
      price_years: context.price_years,
      media: context.media.slice(),
      //attached_file: context.attached_file.slice(),
    };
    const userToken = getAuthToken();
    //console.log(enteredData);
    try {
      let response = await fetch(
        "https://zadapp.mqawilk.com/api/houses/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(enteredData),
        }
      );
      const data = await response.json();
      context.setFormData((prevData) => {
        return { ...prevData, id: data.id };
      });
      //navigate("/dashboard/Review");
      navigate("/dashboard/Contract");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.map}>
      <p>تحديد المنشأة على الخريطة</p>
      <div className={styles.mapItem}>
        <Map />
      </div>
      <FormButton
        class={styles.save}
        type="button"
        icon={<LiaHotelSolid />}
        onClick={saveData}
      >
        حفظ تسجيل المنشأة
      </FormButton>
    </div>
  );
};

export default ThirdPage;
