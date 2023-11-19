import styles from "../styles/_AddBuilding.module.scss";
import MainHeader from "../components/UI/MainHeader";
import AddBuildingForm from "../components/AddBuilding/AddBuildingForm";
import { LiaHotelSolid } from "react-icons/lia";
import StyledContainer from "../components/UI/StyledContainer";
import { useTranslation } from "react-i18next";
import { getAuthToken } from "../util/auth";
import { useLoaderData } from "react-router-dom";

const EditBuilding = () => {
  const [t, i18n] = useTranslation("global");
  const data = useLoaderData();
  const firstData = {
    house_name: data[0].house_name,
    type: data[0].type,
    total_room: data[0].total_room,
    street: data[0].street,
    hajjaj_count: data[0].hajjaj_count,
    hajjaj_accsept: data[0].hajjaj_accsept,
    number_prrmit: data[0].number_prrmit,
    house_owner_name: data[0].house_owner_name,
    phone: data[0].phone,
    build_number_prrmit: data[0].build_number_prrmit,
    total_floor: data[0].total_floor,
    owner_ip: data[0].owner_ip,
    lessor_name: data[0].lessor_name,
    alarm_network: data[0].alarm_network,
    fire_network: data[0].fire_network,
    fire_pump: data[0].fire_pump,
    generator: data[0].generator,
  };
  const secondData = {
    bilud_component: data[0].bilud_component,
    institution_maintenance: data[0].institution_maintenance,
    institution_safty: data[0].institution_safty,
    price_hajj: data[0].price_hajj,
    price_years: data[0].price_years,
    media: data[0].media.slice(),
  };
  const thirdData = {
    lat: data[0].lat,
    lang: data[0].lang,
    adresse: data[0].adresse,
  };
  return (
    <div className={styles.page}>
      <StyledContainer>
        <div className={styles.body}>
          <MainHeader text={t("body.editBuilding")} icon={<LiaHotelSolid />} />
          <AddBuildingForm
            state="edit"
            firstPageData={firstData}
            secondPageData={secondData}
            thirdPageData={thirdData}
          />
        </div>
      </StyledContainer>
    </div>
  );
};

export default EditBuilding;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const id = sessionStorage.getItem("houseId");
  const token = getAuthToken();
  let response = "";
  try {
    response = await fetch(
      "https://zadapp.mqawilk.com/api/show/selfhoues/" + id,
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
