import styles from "../styles/_AddBuilding.module.scss";
import MainHeader from "../components/UI/MainHeader";
import AddBuildingForm from "../components/AddBuilding/AddBuildingForm";
import { LiaHotelSolid } from "react-icons/lia";
import StyledContainer from "../components/UI/StyledContainer";
import { useState } from "react";

const AddBuilding = () => {
  return (
    <div className={styles.page}>
      <StyledContainer>
        <div className={styles.body}>
          <MainHeader text="إضافة منشأة" icon={<LiaHotelSolid />} />
          <AddBuildingForm />
        </div>
      </StyledContainer>
    </div>
  );
};

export default AddBuilding;

export async function action({ request }) {
  const formData = await request.formData();
   const enteredData = {
    buildingName: formData.get("buildingName"),
    buildingType: formData.get("buildingType"),
    roomNum: formData.get("roomNum"),
    streetName: formData.get("streetName"),
    actualPilgrims: formData.get("actualPilgrims"),
    writtenPilgrims: formData.get("writtenPilgrims"),
    paperNum: formData.get("paperNum"),
    ownerName: formData.get("ownerName"),
    phone: formData.get("phone"),
    licenseNum: formData.get("licenseNum"),
    floorsNum: formData.get("floorsNum"),
    ownerId: formData.get("ownerId"),
    renterName: formData.get("renterName"),
    alarm: formData.get("input1"),
  };
  console.log(enteredData);
  //console.log(formData.get("buildingName"));
  /*const enteredData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  let response;
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredData),
    });
  } catch (error) {
    console.log(error.message);
  }*/
  return "";
}
